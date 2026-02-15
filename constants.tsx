import React from 'react';
import { 
  Bus, 
  Plane, 
  UserCheck, 
  Map, 
  Hotel, 
  GraduationCap, 
  Users, 
  Calendar,
  ShieldCheck,
  Clock,
  CircleDollarSign,
  Car
} from 'lucide-react';
import { Service, Vehicle, Testimonial } from './types';

export const SERVICES: Service[] = [
  { id: '1', title: 'Airport Transfers', description: 'Reliable arrival & departure transfers across all major airports with professional greeting.', icon: 'Plane' },
  { id: '2', title: 'Chauffeur Services', description: 'Professional chauffeur-driven luxury vehicles for corporate and VIP events.', icon: 'UserCheck' },
  { id: '3', title: 'Regional Tours', description: 'Guided luxury bus tours exploring the local landmarks and cultural beauty.', icon: 'Map' },
  { id: '4', title: 'Bus Rental', description: 'Short and long-term rental solutions with highly flexible contracts.', icon: 'Bus' },
  { id: '5', title: 'Staff Transportation', description: 'Efficient and punctual daily commute for large-scale employee transport.', icon: 'Users' },
  { id: '6', title: 'School Transport', description: 'Safe and secure daily transport for students at all educational levels.', icon: 'GraduationCap' },
  { id: '7', title: 'Hotel Services', description: 'Specialized transfer services for the hospitality and tourism sectors.', icon: 'Hotel' },
  { id: '8', title: 'Event Logistics', description: 'Seamless group transportation for corporate conferences and large events.', icon: 'Calendar' },
];

export const FLEET: Vehicle[] = [
  {
    id: 'f1',
    name: '53 Seater Luxury Coach',
    capacity: '50-53 Passengers',
    features: ['Plush Reclining Seats', 'Advanced Climate Control', 'High-Speed Wi-Fi', 'Spacious Cargo Area'],
    imageUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=1200',
    specifications: { ac: true, safety: 'Certified Safety Systems', comfort: 'Premium Interior' }
  },
  {
    id: 'f2',
    name: '35 Seater Executive Coach',
    capacity: '35 Passengers',
    features: ['Media Entertainment', 'Dual Air Conditioning', 'Privacy Curtains'],
    imageUrl: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&q=80&w=1200',
    specifications: { ac: true, safety: 'Full Monitoring System', comfort: 'Executive Design' }
  },
  {
    id: 'f3',
    name: '30 Seater Economy Bus',
    capacity: '30 Passengers',
    features: ['Efficient City Travel', 'Comfortable Seating', 'Smooth Suspension'],
    imageUrl: 'https://images.unsplash.com/photo-1494515843206-f3117d3f51b7?auto=format&fit=crop&q=80&w=1200',
    specifications: { ac: true, safety: 'Standard Safety Compliance', comfort: 'Reliable Commute' }
  },
  {
    id: 'f4',
    name: '15 Seater Passenger Van',
    capacity: '15 Passengers',
    features: ['Agile Handling', 'Comfortable Cabin', 'Quick Boarding Access'],
    imageUrl: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&q=80&w=1200',
    specifications: { ac: true, safety: 'Multi-point Safety Harness', comfort: 'Modern Interior' }
  }
];

export const WHY_CHOOSE_US = [
  { title: 'Safety Integrity', description: 'Our entire fleet undergoes strict mechanical and hygiene audits daily.', icon: ShieldCheck },
  { title: '24/7 Logistics', description: 'Continuous support dispatch to handle any logistical requirement around the clock.', icon: Clock },
  { title: 'Professional Crew', description: 'Multilingual, certified drivers with extensive knowledge of all major routes.', icon: UserCheck },
  { title: 'Competitive Value', description: 'Bespoke pricing plans designed to provide maximum value for your budget.', icon: CircleDollarSign },
];

export const INDUSTRIES = [
  'Corporate Business Houses',
  'Educational Institutions',
  'Luxury Hotels & Resorts',
  'International Tourism Agencies',
  'Major Event Management Companies',
  'Regional Airline Logistics'
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Alex Rivera',
    company: 'Global Events Group',
    content: 'The most professional transport partner we have worked with. Their attention to detail and punctuality is unmatched.',
    rating: 5
  },
  {
    id: 't2',
    name: 'Janice Wu',
    company: 'Grand Heritage Hotel',
    content: 'Reliable, safe, and clean vehicles every time. Our guests always appreciate the level of service provided.',
    rating: 5
  }
];