import "@sanity/ui/styles.css";
import "sanity";
import MuxPlayerElement from "@mux/mux-player";
import { PartialDeep } from "type-fest";
/**
 * API shapes keep Mux's snake_case. The records stored on `mux.videoAsset` are camelCase, except
 * the fields a job record copies straight from Mux.
 */
/** The twelve workflows, as they appear in `POST /robots/v0/jobs/{workflow}`. */
declare const ROBOTS_WORKFLOWS: readonly ["generate-premium-captions", "edit-captions", "translate-captions", "translate-audio", "summarize", "ask-questions", "find-key-moments", "find-best-thumbnails", "generate-engagement-insights", "generate-chapters", "find-scenes", "moderate"];
type RobotsWorkflow = (typeof ROBOTS_WORKFLOWS)[number];
type RobotsJobStatus = 'pending' | 'processing' | 'completed' | 'errored' | 'cancelled';
type RobotsDirectiveRunStatus = 'pending' | 'dispatching' | 'running' | 'waiting' | 'completed' | 'partial' | 'errored';
interface RobotsJobRecord {
  _key: string;
  _type: 'mux.robotsJob';
  id: string;
  workflow: RobotsWorkflow;
  status: RobotsJobStatus;
  created_at?: number;
  updated_at?: number;
  units_consumed?: number;
  /** First error message, when the job errored. */
  error?: string;
  /** find-best-thumbnails only: its `thumbnail_time` was copied into `thumbTime`. */
  thumbnailApplied?: boolean;
}
interface RobotsSummarizeOutput {
  jobId: string;
  completedAt?: number;
  title?: string;
  description?: string;
  tags?: string[];
}
interface RobotsModerateOutput {
  jobId: string;
  completedAt?: number;
  exceedsThreshold?: boolean;
  maxScores?: {
    sexual?: number;
    violence?: number;
  };
}
/** The newest completed summarize and moderate outputs on this asset, whoever ran them. */
interface RobotsOutputs {
  _type: 'mux.robotsOutputs';
  summarize?: RobotsSummarizeOutput;
  moderate?: RobotsModerateOutput;
}
interface RobotsDirectiveRunRecord {
  _key: string;
  _type: 'mux.robotsDirectiveRun';
  runId: string;
  directiveId: string;
  status?: RobotsDirectiveRunStatus;
  startedAt?: number;
  completedAt?: number;
  /** Jobs the run dispatched. Unioned, never replaced. */
  jobIds?: string[];
}
/** A create whose outcome isn't known yet: saved before it's sent, removed once resolved. */
interface RobotsPendingCreate {
  _key: string;
  _type: 'mux.robotsPendingCreate';
  requestId: string;
  kind: 'job' | 'directive-run';
  workflow?: RobotsWorkflow;
  directiveId?: string;
  /** Unix seconds, browser clock: the unit of Mux's `created_at`. */
  requestedAt: number;
}
interface RobotsFields {
  robotsJobs?: RobotsJobRecord[];
  robotsOutputs?: RobotsOutputs;
  robotsDirectiveRuns?: RobotsDirectiveRunRecord[];
  robotsPendingCreates?: RobotsPendingCreate[];
}
/**
 * All static rendition resolution options supported by Mux
 */
type StaticRenditionResolution = 'highest' | 'audio-only' | '270p' | '360p' | '480p' | '540p' | '720p' | '1080p' | '1440p' | '2160p';
interface MuxInputConfig {
  /**
   * Enable static renditions by default. Can be overwritten on a per-asset basis.
   * Supports:
   * - Standard mode: 'highest' (up to 4K MP4) and/or 'audio-only' (M4A)
   * - Advanced mode: Specific resolutions ('270p', '360p', '480p', '540p', '720p', '1080p', '1440p', '2160p') and/or 'audio-only'
   *
   * **Important**: 'highest' cannot be mixed with specific resolutions. If both are provided, only 'highest' will be used.
   *
   * @see {@link https://docs.mux.com/guides/video/enable-static-mp4-renditions}
   * @defaultValue []
   */
  static_renditions: StaticRenditionResolution[];
  /**
   * @deprecated Use `static_renditions` instead. This field is kept for backward compatibility.
   * Enable static renditions by setting this to 'standard'. Can be overwritten on a per-asset basis.
   * Requires `"video_quality": "plus"`
   * @see {@link https://docs.mux.com/guides/video/enable-static-mp4-renditions#why-enable-mp4-support}
   * @defaultValue 'none'
   */
  mp4_support: 'none' | 'standard';
  /**
   * Max resolution tier can be used to control the maximum resolution_tier your asset is encoded, stored, and streamed at.
   * Requires `"video_quality": "plus"`
   * @see {@link https://docs.mux.com/guides/stream-videos-in-4k}
   * @defaultValue '1080p'
   */
  max_resolution_tier: '2160p' | '1440p' | '1080p';
  /**
   * @deprecated Use {@link video_quality}
   * <br>
   * The encoding tier informs the cost, quality, and available platform features for the asset.
   * @see {@link https://docs.mux.com/guides/use-encoding-tiers}
   * @defaultValue 'smart'
   */
  encoding_tier?: 'baseline' | 'smart';
  /**
   * The video quality level informs the cost, quality, and available platform features for the asset.
   * @see {@link https://www.mux.com/docs/guides/use-video-quality-levels}
   * @defaultValue 'plus'
   */
  video_quality: 'basic' | 'plus' | 'premium';
  /**
   * Normalize the audio track loudness level.
   * @see {@link https://docs.mux.com/guides/adjust-audio-levels#how-to-turn-on-audio-normalization}
   * @defaultValue false
   */
  normalize_audio: boolean;
  /**
   * Enables signed URLs by default, if you configured them with your API token.
   * @see {@link https://docs.mux.com/guides/secure-video-playback}
   * @defaultValue false
   */
  defaultSigned?: boolean;
  /**
   * Enables public URLs by default.
   * @defaultValue true
   */
  defaultPublic?: boolean;
  /**
   * Enables DRM Protection by default, if you configured your DRM Configuration Id.
   * @see {@link https://www.mux.com/docs/guides/protect-videos-with-drm}
   * @defaultValue true
   */
  defaultDrm?: boolean;
  /**
   * Attach an inline copy of an asset's metadata along with its reference.
   * Please note that this copy can become stale if the asset is edited after upload/selection.
   * @defaultValue false
   */
  inlineAssetMetadata?: boolean;
  /**
   * Auto-generate captions for these languages by default.
   * Requires `"video_quality": "plus"`
   *
   * @see {@link https://docs.mux.com/guides/add-autogenerated-captions-and-use-transcripts}
   * @deprecated use `defaultAutogeneratedSubtitleLang` instead. Only a single autogenerated
   */
  defaultAutogeneratedSubtitleLangs?: SupportedMuxLanguage[];
  /**
   * Auto-generate captions for this language by default. Users can still
   * Requires `"video_quality": "plus"`
   *
   * @see {@link https://docs.mux.com/guides/add-autogenerated-captions-and-use-transcripts}
   */
  defaultAutogeneratedSubtitleLang?: SupportedMuxLanguage;
  /**
   * Whether or not to allow content editors to override asset upload
   * configuration settings when uploading a video to Mux.
   *
   * @see {@link https://docs.mux.com/guides/secure-video-playback}
   * @defaultValue false
   */
  disableUploadConfig?: boolean;
  /**
   * Whether or not to allow content editors to add text tracks alongside their
   * asset when uploading a video to Mux.
   *
   * @see {@link https://docs.mux.com/guides/secure-video-playback}
   * @defaultValue false
   */
  disableTextTrackConfig?: boolean;
  /**
   * Whether or not to show the playback warning when trying to watch DRM content for the first time.
   *
   * @defaultValue false
   */
  disableDrmPlaybackWarning?: boolean;
  /**
   * The mime types that are accepted by the input.
   *
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/accept}
   * @defaultValue ['video/*','audio/*']

   */
  acceptedMimeTypes?: ('audio/*' | 'video/*')[];
  /**
   * Maximum file size allowed for video uploads in bytes.
   * If not specified, no file size validation will be performed.
   *
   * @example 1024 * 1024 * 1024 // 1 GB
   * @defaultValue undefined
   */
  maxAssetFileSize?: number;
  /**
   * Maximum video duration allowed in seconds.
   * If not specified, no duration validation will be performed.
   *
   * @example 2 * 60 * 60 // 2 hours
   * @defaultValue undefined
   */
  maxAssetDuration?: number;
  /**
   * HLS.js configuration options to be passed to the Mux Player.
   * These options allow you to customize the underlying HLS.js playback engine behavior.
   *
   * @see {@link https://github.com/video-dev/hls.js/blob/master/docs/API.md#fine-tuning}
   * @defaultValue undefined
   * @example
   * ```ts
   * {
   *   maxBufferLength: 30,
   *   lowLatencyMode: true,
   *   capLevelToPlayerSize: true
   * }
   * ```
   */
  hlsConfig?: MuxPlayerElement['_hlsConfig'];
  /**
   * The roles that can start and cancel Mux Robots workflows and directive runs. Everyone can
   * see results. An empty list lets every role run Robots.
   *
   * This only hides controls in the Studio: any project member can call the Mux proxy.
   * @see {@link https://www.mux.com/docs/guides/robots}
   * @defaultValue ['administrator']
   */
  allowedRolesForRobots?: string[];
  /**
   * Mux Robots directives attached to every new upload. They run once Mux has ingested the
   * video, and consume Mux AI units. People who can run Robots can uncheck them per upload.
   * @see {@link https://www.mux.com/docs/guides/robots-directives}
   * @defaultValue []
   */
  defaultDirectiveIds?: string[];
  /**
   * Whether or not to allow content editors to edit the name of the
   * asset when uploading a video to Mux.
   *
   * @defaultValue false
   */
  disableAssetNameConfig?: boolean;
}
interface PluginConfig extends MuxInputConfig {
  /**
   * How the videos browser should appear as a studio tool in Sanity's top navigation
   *
   * Pass `false` if you want to disable it.
   * @defaultValue {title: 'Videos', icon: VideoIcon}
   **/
  tool: false | {
    title?: string;
    icon?: React.ComponentType;
  };
  /**
   * The roles that are allowed to configure the plugin.
   *
   * If not set, all roles will be allowed to configure the plugin.
   * @defaultValue []
   */
  allowedRolesForConfiguration: string[];
  /**
   * Send only Mux addon requests (`/v<apiVersion>/addons/mux/...`) to this host, for example a
   * local development server. Content Lake requests (queries, listeners, asset documents)
   * still use the Studio API host.
   *
   * The host is used as-is: the plugin does not prepend the project id to it. If your server needs
   * the project id in the hostname, include it in the host, like `http://<projectId>.example.test:8000`.
   *
   * Auth: the Studio token (if any) is sent as `Authorization: Bearer`. Session cookies for the
   * Studio API host are not sent to a different host.
   *
   * @example 'http://127.0.0.1:8080'
   * @defaultValue undefined
   */
  muxApiHost?: string;
}
declare const SUPPORTED_MUX_LANGUAGES_VALUES: ("en" | "es" | "it" | "pt" | "de" | "fr" | "pl" | "ru" | "nl" | "ca" | "tr" | "sv" | "uk" | "no" | "fi" | "sk" | "el" | "cs" | "hr" | "da" | "ro" | "bg")[];
type SupportedMuxLanguage = (typeof SUPPORTED_MUX_LANGUAGES_VALUES)[number];
type PlaybackPolicy = 'signed' | 'public' | 'drm';
interface MuxErrors {
  type: string;
  messages: string[];
}
interface MuxPlaybackId {
  id: string;
  policy: PlaybackPolicy;
}
interface MuxVideoTrack {
  type: 'video';
  id: string;
  max_width: number;
  max_height: number;
  max_frame_rate: -1 | number;
  duration?: number;
}
interface MuxAudioTrack {
  type: 'audio';
  id: string;
  duration?: number;
  max_channels?: number;
  max_channel_layout?: 'stereo' | string;
  primary?: boolean;
  language_code?: 'en' | 'en-US' | string;
  name?: 'English' | string;
  passthrough?: string;
  status?: 'preparing' | 'ready' | 'errored';
  error?: {
    type: string;
    messages?: string[];
  };
}
interface MuxTextTrack {
  type: 'text';
  id: string;
  text_type?: 'subtitles' | 'chapters';
  text_source?: 'uploaded' | 'embedded' | 'generated_live' | 'generated_live_final' | 'generated_vod';
  language_code?: 'en' | 'en-US' | string;
  name?: 'English' | string;
  closed_captions?: boolean;
  passthrough?: string;
  status: 'preparing' | 'ready' | 'errored';
  error?: {
    type: string;
    messages?: string[];
  };
}
type MuxTrack = MuxVideoTrack | MuxAudioTrack | MuxTextTrack;
interface MuxAsset {
  id: string;
  /** In seconds (instead of JS's default milliseconds) */
  created_at: string;
  status: 'preparing' | 'ready' | 'errored';
  duration: number;
  max_stored_resolution: 'Audio only' | 'SD' | 'HD' | 'FHD' | 'UHD';
  max_resolution_tier?: '2160p' | '1440p' | '1080p';
  max_stored_frame_rate: -1 | number;
  aspect_ratio: `${number}:${number}`;
  playback_ids: MuxPlaybackId[];
  tracks: MuxTrack[];
  errors?: MuxErrors;
  upload_id: string;
  is_live?: boolean;
  passthrough: string;
  live_stream_id?: string;
  master?: {
    status: 'ready' | 'preparing' | 'errored';
    url?: string;
  };
  master_access: 'temporary' | 'none';
  mp4_support: 'standard' | 'none';
  source_asset_id?: string;
  normalize_audio?: boolean;
  static_renditions?: {
    status: 'ready' | 'preparing' | 'disabled' | 'errored';
    files: {
      name: string;
      ext: 'mp4' | 'm4a';
      height: number;
      width: number;
      bitrate: number;
      filesize: string;
      type: 'standard' | 'advanced';
      status: 'ready' | 'preparing' | 'skipped' | 'errored';
      resolution_tier?: string;
      resolution?: string;
      id: string;
      passthrough?: string;
    }[];
  };
  recording_times?: {
    started_at: string;
    duration: number;
    type: 'content' | 'slate';
  }[];
  non_standard_input_reasons?: {
    video_codec?: string;
    audio_codec?: string;
    video_gop_size?: 'high';
    video_frame_rate?: string;
    video_resolution?: string;
    video_bitrate?: 'high';
    pixel_aspect_ratio?: string;
    video_edit_list?: 'non-standard';
    audio_edit_list?: 'non-standard';
    unexpected_media_file_parameters?: 'non-standard';
    test?: boolean;
  };
  meta?: {
    title?: string;
  };
  /** Seconds. Set by Robots' find-best-thumbnails with `update_asset_thumbnail`. */
  thumbnail_time?: number;
}
interface VideoAssetDocument extends RobotsFields {
  _id: string;
  _type: 'mux.videoAsset';
  _createdAt: string;
  _updatedAt?: string;
  status?: string;
  assetId?: string;
  playbackId?: string;
  filename?: string;
  thumbTime?: number;
  data?: PartialDeep<MuxAsset>;
}
export declare const defaultConfig: PluginConfig;
export declare const muxInput: import("sanity").Plugin<void | Partial<PluginConfig>>;
export type { VideoAssetDocument };
//# sourceMappingURL=index.d.ts.map