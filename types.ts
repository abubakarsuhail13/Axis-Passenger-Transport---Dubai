
export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Vehicle {
  id: string;
  name: string;
  capacity: string;
  features: string[];
  imageUrl: string;
  specifications: {
    ac: boolean;
    safety: string;
    comfort: string;
  };
}

export interface Testimonial {
  id: string;
  name: string;
  company: string;
  content: string;
  rating: number;
}
