/**
 * Represents the base URL for all API requests
 *
 * @private
 */
export const URL_BASE = 'https://derpibooru.org';
export const URL_BASE_PHILOMENA = 'https://derpibooru.org/api/v1/json';

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
export const TAG_URL = URL_BASE_PHILOMENA + '/tags/{}';

/**
 * Represents the URL for tag searches
 */
export const TAG_SEARCH_URL = URL_BASE_PHILOMENA + '/search/tags';

/**
 * Represents the URL for image details
 *
 * @private
 */
export const IMAGE_URL = URL_BASE_PHILOMENA + '/images/{}';

/**
 * Represents the URL for image comments
 * PHILOMENA: /api/v1/json/search/comments?q=image_id:{}
 * 
 * @private
 */
export const COMMENTS_URL = URL_BASE_PHILOMENA + '/search/comments';

/**
 * Represents the URL for searches
 * PHILOMENA: /api/v1/json/search/images
 *
 * @private
 */
export const SEARCH_URL = URL_BASE_PHILOMENA + '/search/images';

/**
 * Represents the URL for reverse image searches
 * PHILOMENA: /api/v1/json/search/reverse
 *
 * @private
 */
export const REVERSE_IMAGE_SEARCH_URL = URL_BASE_PHILOMENA + '/search/reverse';
