export const classifyFile = (mimeType: string): 'image' | 'video' | 'audio' | 'document' | 'other' => {
    if (mimeType.startsWith('image/')) {
        return 'image';
    } else if (mimeType.startsWith('video/')) {
        return 'video';
    } else if (mimeType.startsWith('audio/')) {
        return 'audio';
    } else if (mimeType.includes('pdf') || mimeType.includes('excel')){
        return 'document';
    }
    else {
        return 'other';
    }
}