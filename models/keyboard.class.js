/**
 * Represents the keyboard input state for the game.
 * Each property indicates whether a specific key is currently pressed.
 */
class Keyboard {
    /** @type {boolean} Move left */
    LEFT = false;

    /** @type {boolean} Move right */
    RIGHT = false;

    /** @type {boolean} Jump */
    UP = false;

    /** @type {boolean} Down (unused) */
    DOWN = false;

    /** @type {boolean} Throw bottle */
    SPACE = false;

    /** @type {boolean} Prevents autofire for SPACE */
    SPACE_PRESSED = false;

    /** @type {boolean} Key D (custom use) */
    D = false;

    /** @type {boolean} Toggle fullscreen */
    F = false;

    /** @type {boolean} Pause key (P) */
    P = false;

    /** @type {boolean} Pause flag */
    PAUSE = false;

    /** @type {boolean} Turn music off (T) */
    T = false;

    /** @type {boolean} Turn music on (Z) */
    Z = false;

    /** @type {boolean} Show information (also triggers pause) */
    INFO = false;

    /** @type {boolean} Open menu */
    MENU = false;

    /** @type {boolean} Enter key */
    ENTER = false;

    /** @type {boolean} Key E (custom use) */
    E = false;

    /** @type {boolean} Escape key */
    ESC = false;

    /** @type {boolean} Play again (yes) */
    J = false;

    /** @type {boolean} Play again (no) */
    N = false;
}
