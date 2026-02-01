'use client';

import { useEffect, useState } from 'react';
import { profileApi } from '@/lib/api';
import { Profile, Project } from '@/types';
import ProfileCard from '@/components/ProfileCard';
import SkillsGrid from '@/components/SkillsGrid';
import ProjectsList from '@/components/ProjectsList';
import SearchBar from '@/components/SearchBar';
import Loading from '@/components/Loading';
import AdminEditButton from '@/components/AdminEditButton';

export default function Home() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      setLoading(true);
      const data = await profileApi.getProfile();
      setProfile(data);
      setProjects(data.projects || []);
    } catch (error: any) {
      console.error('Error loading profile:', error);
      setMessage('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      if (profile) {
        setProjects(profile.projects || []);
      }
      setMessage('');
      return;
    }

    try {
      const results = await profileApi.search(query);
      setProjects(results.projects || []);
      
      const totalResults = (results.skills?.length || 0) + (results.projects?.length || 0);
      setMessage(`Found ${totalResults} results`);
      
      // Clear message after 3 seconds
      setTimeout(() => setMessage(''), 3000);
    } catch (error: any) {
      console.error('Search error:', error);
      setMessage('Search failed');
    }
  };

  const handleSkillClick = async (skill: string) => {
    try {
      const filteredProjects = await profileApi.getProjects(skill);
      setProjects(filteredProjects || []);
      setMessage(`Showing projects with ${skill}`);
      
      
      setTimeout(() => setMessage(''), 3000);
    } catch (error: any) {
      console.error('Filter error:', error);
      setMessage('Failed to filter projects');
    }
  };

  if (loading) return <Loading />;

  if (!profile) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900">No profile found</h1>
        <p className="text-gray-600 mt-2">Please seed the database first.</p>
        <button
          onClick={loadProfile}
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
     
      {message && (
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg text-blue-800 text-sm">
          {message}
        </div>
      )}

    
      <div className="mb-8">
        <SearchBar onSearch={handleSearch} />
      </div>


      <div className="mb-8">
        <ProfileCard profile={profile} />
      </div>

      
      <div className="mb-8">
        <SkillsGrid skills={profile.skills} onSkillClick={handleSkillClick} />
      </div>

   
      <div>
        <ProjectsList projects={projects} />
      </div>
       <AdminEditButton />
    </div>
  );
}