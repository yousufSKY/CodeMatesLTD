import { adminDb } from '@/lib/firebase-admin';
import type { Project } from './models';

export const adminProjects = {
  async getAll(): Promise<Project[]> {
    const snapshot = await adminDb.collection('projects').get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Project));
  },

  async get(id: string): Promise<Project | null> {
    const doc = await adminDb.collection('projects').doc(id).get();
    if (!doc.exists) return null;
    return { id: doc.id, ...doc.data() } as Project;
  },

  async create(data: Omit<Project, 'id'>): Promise<string> {
    const doc = await adminDb.collection('projects').add(data);
    return doc.id;
  },

  async update(id: string, data: Partial<Project>): Promise<void> {
    await adminDb.collection('projects').doc(id).update(data);
  },

  async delete(id: string): Promise<void> {
    await adminDb.collection('projects').doc(id).delete();
  }
};