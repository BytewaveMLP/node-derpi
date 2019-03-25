/**
 * Represents the base URL for all API requests
 *
 * @private
 */
export const URL_BASE = 'https://derpibooru.org';

/**
 * Represents the URL for user profiles (by ID)
 * 
 * @private
 */
export const USER_ID_URL = '/api/v2/users/show.json';

/**
 * Represents the URL for user profiles (by name)
 *
 * @private
 */
export const USER_URL = '/profiles/{}.json';

/**
 * Represents the URL for tag details (by ID)
 *
 * @private
 */
export const TAG_ID_URL = '/api/v2/tags/show.json';

/**
 * Represents the URL for tag details (by name)
 *
 * @private
 */
export const TAG_URL = '/tags/{}.json';

/**
 * Represents the URL for image details
 *
 * @private
 */
export const IMAGE_URL = '/images/{}.json';

/**
 * Represents the URL for image comments
 *
 * @private
 */
export const COMMENTS_URL = '/images/{}/comments.json';

/**
 * Represents the URL for searches
 *
 * @private
 */
export const SEARCH_URL = '/search.json';

/**
 * Represents the URL for reverse image searches
 *
 * @private
 */
export const REVERSE_IMAGE_SEARCH_URL = '/search/reverse.json';
