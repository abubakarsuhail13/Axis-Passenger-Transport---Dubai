
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
  { id: '1', title: 'Airport Transfers', description: 'Reliable arrival & departure transfers across all UAE airports.', icon: 'Plane' },
  { id: '2', title: 'Chauffeur Services', description: 'Professional chauffeur-driven luxury vehicles for all occasions.', icon: 'UserCheck' },
  { id: '3', title: 'UAE Tours', description: 'Guided luxury bus tours exploring the beauty of the Emirates.', icon: 'Map' },
  { id: '4', title: 'Bus Rental', description: 'Short and long-term rental solutions with flexible contracts.', icon: 'Bus' },
  { id: '5', title: 'Staff Transportation', description: 'Efficient and punctual daily commute for corporate employees.', icon: 'Users' },
  { id: '6', title: 'School Transport', description: 'Safe and secure daily transport for schools and colleges.', icon: 'GraduationCap' },
  { id: '7', title: 'Hotel Services', description: 'Limousine and staff transfer services for the hospitality sector.', icon: 'Hotel' },
  { id: '8', title: 'Event Logistics', description: 'Seamless group transportation for weddings, corporate events, and more.', icon: 'Calendar' },
];

export const FLEET: Vehicle[] = [
  {
    id: 'f1',
    name: '50/53 Seater Luxury Bus',
    capacity: '50-53 Passengers',
    features: ['Plush Reclining Seats', 'Climate Control', 'On-board Wi-Fi', 'Ample Luggage Space'],
    imageUrl: 'https://picsum.photos/id/183/800/600',
    specifications: { ac: true, safety: 'ABS, EBD, 3-Point Belts', comfort: 'Executive Seating' }
  },
  {
    id: 'f2',
    name: '35/37 Seater Luxury Coach',
    capacity: '35-37 Passengers',
    features: ['Premium Audio System', 'Dual AC', 'Large Viewing Windows'],
    imageUrl: 'https://picsum.photos/id/1071/800/600',
    specifications: { ac: true, safety: 'CCTV Monitored', comfort: 'Standard Luxury' }
  },
  {
    id: 'f3',
    name: '30 Seater Toyota Coaster',
    capacity: '30 Passengers',
    features: ['High Roof', 'Compact & Efficient', 'Smooth Ride'],
    imageUrl: 'https://picsum.photos/id/1072/800/600',
    specifications: { ac: true, safety: 'Emergency Exit', comfort: 'Ergonomic Seats' }
  },
  {
    id: 'f4',
    name: '15 Seater Toyota Hiace',
    capacity: '15 Passengers',
    features: ['Versatile', 'Comfortable Seating', 'Quick Boarding'],
    imageUrl: 'https://picsum.photos/id/1074/800/600',
    specifications: { ac: true, safety: 'SRS Airbags', comfort: 'High Efficiency' }
  }
];

export const WHY_CHOOSE_US = [
  { title: 'Safety First', description: 'All vehicles undergo rigorous periodic inspections and safety checks.', icon: ShieldCheck },
  { title: '24/7 Availability', description: 'Round-the-clock operation support to handle any transport emergency.', icon: Clock },
  { title: 'Expert Drivers', description: 'Multilingual, RTA-certified professional chauffeurs with years of experience.', icon: UserCheck },
  { title: 'Affordable Pricing', description: 'Premium service at competitive market rates with no hidden costs.', icon: CircleDollarSign },
];

export const INDUSTRIES = [
  'Corporate Offices',
  'Schools & Colleges',
  'Hotels & Resorts',
  'Tourism Companies',
  'Event Planners',
  'Airline Crew'
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Sarah Johnson',
    company: 'Skyline Events Dubai',
    content: 'Axis Transport provided exceptional service for our corporate retreat. The buses were spotless and the drivers were incredibly professional.',
    rating: 5
  },
  {
    id: 't2',
    name: 'Ahmed Al Mansouri',
    company: 'Palm Heights Hotel',
    content: 'We rely on Axis for our daily staff transfers. Their punctuality and reliability are unmatched in the Dubai market.',
    rating: 5
  }
];
