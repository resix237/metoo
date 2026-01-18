export interface PhotoType {
    id: string;
    driveId: string;
    title?: string;
    description?: string;
}

export const getDriveImageUrl = (driveId: string) => {
    return `https://docs.google.com/uc?id=${driveId}&export=download`;
};

export const galleryPhotos: PhotoType[] = [
    {
        id: '1',
        driveId: '1-0G8f_W_x_Z_X_Z_X_Z_X_Z_X_Z', // Placeholder IDs
        title: 'Nature Shot',
        description: 'Captured during a morning hike.'
    },
    {
        id: '2',
        driveId: '1-0G8f_W_x_Z_X_Z_X_Z_X_Z_X_Z',
        title: 'Street Photography',
        description: 'Urban vibes in the city.'
    },
    {
        id: '3',
        driveId: '1-0G8f_W_x_Z_X_Z_X_Z_X_Z_X_Z',
        title: 'Mountain View',
        description: 'Serene mountains at sunset.'
    },
    {
        id: '4',
        driveId: '1-0G8f_W_x_Z_X_Z_X_Z_X_Z_X_Z',
        title: 'Architecture',
        description: 'Modern buildings and lines.'
    },
    {
        id: '5',
        driveId: '1-0G8f_W_x_Z_X_Z_X_Z_X_Z_X_Z',
        title: 'Portrait',
        description: 'Expressive moments.'
    }
];
