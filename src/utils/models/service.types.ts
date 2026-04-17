import type { IconType } from 'react-icons';

export interface ServiceFeature {
    text: string;
}

export interface Service {
    id: number;
    title: string;
    description: string;
    icon: IconType;
    features: ServiceFeature[];
}


