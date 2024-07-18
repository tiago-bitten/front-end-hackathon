import { enqueueSnackbar, SnackbarOrigin, TransitionDuration } from 'notistack';

const defaultAnchorOrigin: SnackbarOrigin = {
    vertical: 'top',
    horizontal: 'right',
};

const defaultTransitionDuration: TransitionDuration = {
    enter: 225,
    exit: 195,
};

const defaultAutoHideDuration = 3000;

const style = { fontFamily: 'Arial' };

interface IShowNotification {
    message: string;
    variant?: 'success' | 'error' | 'warning' | 'info';
    anchorOrigin?: SnackbarOrigin;
    transitionDuration?: TransitionDuration;
    autoHideDuration?: number;
}

export const showNotification = ({
    variant,
    message,
    transitionDuration,
    anchorOrigin,
    autoHideDuration,
}: IShowNotification) => {
    if (!message || message.length === 0) {
        return;
    }
    enqueueSnackbar(message, {
        variant: variant,
        anchorOrigin: anchorOrigin || defaultAnchorOrigin,
        transitionDuration: transitionDuration || defaultTransitionDuration,
        autoHideDuration: autoHideDuration || defaultAutoHideDuration,
        style: style,
    });
};

export const showSuccessNotification = (message: string) => {
    showNotification({ message: message, variant: undefined });
};

export const showErrorNotification = (message: string) => {
    showNotification({ message: message, variant: undefined, autoHideDuration: 5000 });
};

export const showWarningNotification = (message: string) => {
    showNotification({ message: message, variant: undefined, autoHideDuration: 5000 });
};

export const showInfoNotification = (message: string) => {
    showNotification({ message: message, variant: undefined });
};
