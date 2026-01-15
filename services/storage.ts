
import { LOCAL_IMAGES } from '../data/localAssets';
import { LOCAL_VIDEOS } from '../data/localVideos';

/**
 * Storage Service
 * Handles retrieval of localized media assets.
 * Optimized to return direct values for performance.
 */
export const storage = {
  /**
   * Initializes storage if necessary. 
   * Keeping as a placeholder for potential future runtime asset management.
   */
  init() {
    console.log('📦 Media system ready.');
  },

  /**
   * Retrieves an image directly from the asset registry.
   */
  getImage(key: keyof typeof LOCAL_IMAGES): string {
    return LOCAL_IMAGES[key];
  },

  /**
   * Retrieves a video/gif directly from the asset registry.
   */
  getVideo(key: keyof typeof LOCAL_VIDEOS): string {
    return LOCAL_VIDEOS[key];
  }
};
