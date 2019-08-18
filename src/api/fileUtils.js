export function getFileExtension(file) {
    const filename = file.name;
    return filename.split('.').pop();
}