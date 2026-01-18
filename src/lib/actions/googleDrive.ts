"use server"
import { google } from 'googleapis';
import { PhotoType } from '../data/gallery-data';

const API_KEY = process.env.GOOGLE_API_KEY;
const FOLDER_ID = process.env.GOOGLE_DRIVE_FOLDER_ID;

export async function getGalleryPhotosAction(): Promise<PhotoType[]> {
    console.log('getGalleryPhotosAction: Starting execution');
    console.log('getGalleryPhotosAction: API_KEY present:', !!API_KEY);
    console.log('getGalleryPhotosAction: FOLDER_ID:', FOLDER_ID);

    if (!API_KEY || !FOLDER_ID) {
        console.log('getGalleryPhotosAction: Missing Google Drive API Key or Folder ID');
        return [];
    }

    try {
        console.log('getGalleryPhotosAction: Initializing Google Drive client');
        const drive = google.drive({ version: 'v3', auth: API_KEY });

        console.log('getGalleryPhotosAction: Listing files in folder:', FOLDER_ID);
        const response = await drive.files.list({
            q: `'${FOLDER_ID}' in parents and mimeType contains 'image/' and trashed = false`,
            fields: 'nextPageToken, files(id, name, description)',
            pageSize: 100
        });

        console.log('getGalleryPhotosAction: API Response received:', response.status);
        console.log('getGalleryPhotosAction: API Response data:', response);

        const files = response.data.files || [];
        console.log('getGalleryPhotosAction: Found', files.length, 'files');

        return files.map((file) => ({
            id: file.id || '',
            driveId: file.id || '',
            title: file.name || '',
            description: file.description || '',
        }));
    } catch (error) {
        console.error('getGalleryPhotosAction: Error fetching Google Drive files:', error);
        return [];
    }
}
