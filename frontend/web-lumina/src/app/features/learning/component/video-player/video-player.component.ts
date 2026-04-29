import {
  Component,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  ViewChild,
  OnInit,
  OnDestroy,
  AfterViewInit,
  signal,
  computed,
  effect,
  inject,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-video-player',
  standalone: true,
  template: `
    <div class="video-container" #videoContainer [class.theater-mode]="theaterMode()">
      <video
        #video
        class="w-full h-full object-contain"
        (loadedmetadata)="onMetadataLoaded()"
        (timeupdate)="onTimeUpdate()"
        (ended)="onVideoEnded()"
        (play)="onPlay()"
        (pause)="onPause()"
      ></video>

      <!-- Overlay de controles (aparece al hover) -->
      <div class="controls-overlay" [class.hide-controls]="hideControls()">
        <!-- Botón play/pause central grande -->
        <button class="center-play" (click)="togglePlay()" aria-label="Reproducir/Pausar">
          @if (!playing()) {
            <svg class="w-16 h-16" fill="white" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          } @else {
            <svg class="w-16 h-16" fill="white" viewBox="0 0 24 24">
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
            </svg>
          }
        </button>

        <!-- Barra inferior de controles -->
        <div class="controls-bar">
          <div class="progress-bar-container" (click)="seek($event)">
            <div class="progress-bg"></div>
            <div class="progress-fill" [style.width.%]="progressPercent()"></div>
            <div class="progress-buffer" [style.width.%]="bufferedPercent()"></div>
          </div>

          <div class="controls-buttons flex items-center gap-2 text-sm text-white">
            <button (click)="togglePlay()" class="p-1">
              @if (playing()) {
                <svg class="w-5 h-5" fill="white" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
              } @else {
                <svg class="w-5 h-5" fill="white" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
              }
            </button>

            <span class="text-xs">{{ currentTimeFormatted() }} / {{ durationFormatted() }}</span>

            <div class="relative group">
              <button class="p-1" (click)="toggleSpeedMenu()">⚡ {{ playbackSpeed() }}x</button>
              @if (showSpeedMenu()) {
                <div class="absolute bottom-full mb-2 bg-black rounded p-1 z-10">
                  @for (speed of [0.5, 0.75, 1, 1.25, 1.5, 2]; track speed) {
                    <button class="block px-2 py-1 hover:bg-gray-700 w-full" (click)="setPlaybackSpeed(speed)">
                      {{ speed }}x
                    </button>
                  }
                </div>
              }
            </div>

            <button (click)="toggleSubtitles()" class="p-1" [class.text-blue-400]="subtitlesEnabled()">
              📝 CC
            </button>

            <button (click)="toggleTheaterMode()" class="p-1">
              @if (!theaterMode()) {
                <svg class="w-5 h-5" fill="white" viewBox="0 0 24 24"><path d="M5 3h14v2H5V3zm0 4h14v2H5V7zm0 4h14v2H5v-2zm0 4h14v2H5v-2zm0 4h14v2H5v-2z"/></svg>
              } @else {
                <svg class="w-5 h-5" fill="white" viewBox="0 0 24 24"><path d="M19 6h-2V4h2v2zm-2 8h2v-2h-2v2zM5 6h2V4H5v2zm2 8H5v-2h2v2z"/></svg>
              }
            </button>

            <button (click)="toggleFullscreen()" class="p-1">
              <svg class="w-5 h-5" fill="white" viewBox="0 0 24 24">
                <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .video-container { position: relative; background: black; border-radius: 0.75rem; overflow: hidden; }
    .video-container video { display: block; width: 100%; height: auto; max-height: 70vh; }
    .video-container.theater-mode video { max-height: none; height: calc(100vh - 100px); width: 100%; object-fit: contain; }
    .controls-overlay { position: absolute; bottom: 0; left: 0; right: 0; background: linear-gradient(transparent, rgba(0,0,0,0.8)); padding: 1rem; opacity: 1; transition: opacity 0.2s; }
    .controls-overlay.hide-controls { opacity: 0; pointer-events: none; }
    .center-play { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); background: rgba(0,0,0,0.7); border-radius: 50%; padding: 0.75rem; transition: transform 0.1s; }
    .center-play:hover { transform: translate(-50%, -50%) scale(1.05); }
    .progress-bar-container { width: 100%; height: 4px; background: #444; cursor: pointer; margin-bottom: 8px; position: relative; }
    .progress-bg { position: absolute; width: 100%; height: 100%; background: #444; }
    .progress-fill { position: absolute; height: 100%; background: #3b82f6; pointer-events: none; }
    .progress-buffer { position: absolute; height: 100%; background: #888; pointer-events: none; }
    .controls-buttons { display: flex; gap: 12px; align-items: center; }
  `]
})
export class VideoPlayerComponent implements OnInit, AfterViewInit, OnDestroy {
toggleSpeedMenu() {
throw new Error('Method not implemented.');
}
  @ViewChild('video') videoRef!: ElementRef<HTMLVideoElement>;
  @Input() videoUrl!: string;
  @Input() subtitlesUrl?: string;
  @Input() lastPositionSeconds = 0;
  @Output() timeUpdate = new EventEmitter<number>();
  @Output() videoEnded = new EventEmitter<void>();

  private platformId = inject(PLATFORM_ID);
  private sanitizer = inject(DomSanitizer);
  private isBrowser = isPlatformBrowser(this.platformId);

  playing = signal(false);
  currentTime = signal(0);
  duration = signal(0);
  bufferedPercent = signal(0);
  playbackSpeed = signal(1);
  subtitlesEnabled = signal(false);
  theaterMode = signal(false);
  showSpeedMenu = signal(false);
  hideControls = signal(false);
  private hideTimeout: any;

  progressPercent = computed(() => (this.duration() ? (this.currentTime() / this.duration()) * 100 : 0));
  currentTimeFormatted = computed(() => this.formatTime(this.currentTime()));
  durationFormatted = computed(() => this.formatTime(this.duration()));

  ngOnInit(): void {
    if (!this.isBrowser) return;
    // Configurar atajos de teclado globales
    window.addEventListener('keydown', this.handleKeyboard);
  }

  ngAfterViewInit(): void {
    if (!this.isBrowser) return;
    const videoEl = this.videoRef.nativeElement;
    videoEl.src = this.videoUrl;
    if (this.subtitlesUrl) {
      const track = document.createElement('track');
      track.kind = 'subtitles';
      track.label = 'Español';
      track.srclang = 'es';
      track.src = this.subtitlesUrl;
      videoEl.appendChild(track);
    }
    videoEl.load();
    videoEl.currentTime = this.lastPositionSeconds;
  }

  ngOnDestroy(): void {
    window.removeEventListener('keydown', this.handleKeyboard);
  }

  onMetadataLoaded(): void {
    this.duration.set(this.videoRef.nativeElement.duration);
  }

  onTimeUpdate(): void {
    const video = this.videoRef.nativeElement;
    this.currentTime.set(video.currentTime);
    this.timeUpdate.emit(video.currentTime);
    // Actualizar buffer
    if (video.buffered.length) {
      const bufferedEnd = video.buffered.end(video.buffered.length - 1);
      this.bufferedPercent.set((bufferedEnd / video.duration) * 100);
    }
  }

  onVideoEnded(): void {
    this.playing.set(false);
    this.videoEnded.emit();
  }

  onPlay(): void { this.playing.set(true); this.resetHideTimer(); }
  onPause(): void { this.playing.set(false); this.resetHideTimer(); }

  togglePlay(): void {
    const video = this.videoRef.nativeElement;
    if (video.paused) video.play();
    else video.pause();
  }

  seek(event: MouseEvent): void {
    const container = (event.currentTarget as HTMLElement);
    const rect = container.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const percent = x / rect.width;
    this.videoRef.nativeElement.currentTime = percent * this.duration();
  }

  setPlaybackSpeed(speed: number): void {
    this.playbackSpeed.set(speed);
    this.videoRef.nativeElement.playbackRate = speed;
    this.showSpeedMenu.set(false);
  }

  toggleSubtitles(): void {
    this.subtitlesEnabled.update(v => !v);
    const tracks = this.videoRef.nativeElement.textTracks;
    for (let i = 0; i < tracks.length; i++) {
      tracks[i].mode = this.subtitlesEnabled() ? 'showing' : 'hidden';
    }
  }

  toggleTheaterMode(): void {
    this.theaterMode.update(v => !v);
  }

  toggleFullscreen(): void {
    const elem = this.videoRef.nativeElement.closest('.video-container') as HTMLElement;
    if (!document.fullscreenElement) {
      elem.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }

  private resetHideTimer(): void {
    if (this.hideTimeout) clearTimeout(this.hideTimeout);
    this.hideControls.set(false);
    if (this.playing()) {
      this.hideTimeout = setTimeout(() => this.hideControls.set(true), 3000);
    }
  }

  private handleKeyboard = (e: KeyboardEvent) => {
    const tag = (e.target as HTMLElement).tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA') return;
    switch (e.key) {
      case ' ': case 'Space': e.preventDefault(); this.togglePlay(); break;
      case 'ArrowLeft': e.preventDefault(); this.videoRef.nativeElement.currentTime -= 5; break;
      case 'ArrowRight': e.preventDefault(); this.videoRef.nativeElement.currentTime += 5; break;
      case 'f': e.preventDefault(); this.toggleFullscreen(); break;
      case 'm': e.preventDefault(); this.videoRef.nativeElement.muted = !this.videoRef.nativeElement.muted; break;
    }
  };

  private formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }
}