/**
 * Represents the base URL for all API requests
 *
 * @private
 */
export const URL_BASE = 'https://derpibooru.org';

/**
 * Represents the URL for user profiles
 *
 * @private
 */
export const USER_URL = URL_BASE + '/profiles/{}.json';

/**
 * Represents the URL for tag details
 *
 * @private
 */
export const TAG_URL = URL_BASE + '/tags/{}.json';

/**
 * Represents the URL for image details
 *
 * @private
 */
export const IMAGE_URL = URL_BASE + '/images/{}.json';

/**
 * Represents the URL for image comments
 *
 * @private
 */
export const COMMENTS_URL = URL_BASE + '/images/{}/comments.json';

/**
 * Represents the URL for searches
 *
 * @private
 */
export const SEARCH_URL = URL_BASE + '/search.json';

/**
 * Represents the URL for reverse image searches
 * 
 * @private
 */
export const REVERSE_IMAGE_SEARCH_URL = URL_BASE + '/search/reverse.json';
