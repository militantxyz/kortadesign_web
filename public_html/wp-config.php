<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the website, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://developer.wordpress.org/advanced-administration/wordpress/wp-config/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'wp331' );

/** Database username */
define( 'DB_USER', 'wp331' );

/** Database password */
define( 'DB_PASSWORD', '@R]14]p@9Sg@6F4r' );

/** Database hostname */
define( 'DB_HOST', 'localhost' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         'zah08zv6rv7wedyftqtv8gkbliueokfphlkmurr218dzajxao2umzrg73cza7clp' );
define( 'SECURE_AUTH_KEY',  'nmkb3vp80vcgpriphmubjhalav5ekurl0hqd9qlc37cytmfs7xu2zuz1upp2hw69' );
define( 'LOGGED_IN_KEY',    'wtsrmzx45ikvsbkulsh3d9cczmst24uhmcarfif1un8fk1tguk5ueaiur9fxms6o' );
define( 'NONCE_KEY',        'kdadc0x00pwr4frdmn65fvcnmp9m3kiczpyiuh5q94uwog9fiiyy7dm5x5rhj21q' );
define( 'AUTH_SALT',        'hhxeqo2pduak026funtieggfzg6pfslp9xsnc5nvxkqhbptaytdrf3iwvprpcldz' );
define( 'SECURE_AUTH_SALT', 'arzklpio65lwj8nmwxtrvxcxgelzstissusyf0entwsdyfsgn34dbse3rogepkst' );
define( 'LOGGED_IN_SALT',   'hjf3lnmjbw0c9c81glnqvigx7vhtrq3deocdzqmr52py2vvyvmig8ts7tchbybd7' );
define( 'NONCE_SALT',       'dzp4irwg5yl5gp4cjlf19kesecena7duj5tfdwovbtypirrypygczophzgrrypqw' );

/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 *
 * At the installation time, database tables are created with the specified prefix.
 * Changing this value after WordPress is installed will make your site think
 * it has not been installed.
 *
 * @link https://developer.wordpress.org/advanced-administration/wordpress/wp-config/#table-prefix
 */
define( 'WP_SITEURL', 'https://kortadesign.com' );
define( 'WP_HOME', 'https://kortadesign.com' );
$table_prefix = 'wpna_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://developer.wordpress.org/advanced-administration/debug/debug-wordpress/
 */
define( 'WP_DEBUG', false );
define('WP_DEBUG_DISPLAY', false);
@ini_set('display_errors', 0);

/* Add any custom values between this line and the "stop editing" line. */



/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';

