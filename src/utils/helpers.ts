/**
 * joins classnames like
 * https://github.com/JedWatson/classnames/blob/master/index.js
 * @return {string} combined classNames
 */
export const joinClassNames = (...args: Array<any>): string => {
    const classes: Array<string> = [];

    args.forEach((arg) => {
        if (!arg) return;

        const argType = typeof arg;
        if (argType === 'string' || argType === 'number') {
            classes.push(arg);
        } else if (Array.isArray(arg) && arg.length) {
            const inner = joinClassNames(...arg);
            if (inner) {
                classes.push(inner);
            }
        } else if (argType === 'object') {
            for (const key in arg) {
                if (arg[key]) {
                    classes.push(key);
                }
            }
        }
    });

    return classes.join(' ');
};
