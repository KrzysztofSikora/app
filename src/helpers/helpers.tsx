/**
 * Change first letter to capitalize.
 * @param word
 */

export const capitalizeFirstLetter = (word?: string): string => word ? word?.charAt(0).toUpperCase() + word?.slice(1) : '';

export const formatDate = (inputDate?: string): string => {
    if (inputDate) {
        const date = new Date(inputDate);
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    } else {
        return '';
    }
}