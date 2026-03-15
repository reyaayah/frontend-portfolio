// lib/client-data.ts

import { getProjects, getExperiences, getSkills, getFeaturedProjects } from './api';

// Cache to avoid multiple requests
let projectsCache: any[] | null = null;
let experiencesCache: any[] | null = null;
let skillsCache: any[] | null = null;
let featuredProjectsCache: any[] | null = null;

const CACHE_TIME = 5 * 60 * 1000; // 5 minutes
let projectsCacheTime = 0;
let experiencesCacheTime = 0;
let skillsCacheTime = 0;
let featuredProjectsCacheTime = 0;

function isCacheValid(cacheTime: number): boolean {
    return Date.now() - cacheTime < CACHE_TIME;
}

export async function getProjectsData() {
    if (projectsCache && isCacheValid(projectsCacheTime)) {
        return projectsCache;
    }

    try {
        const data = await getProjects();
        projectsCache = data;
        projectsCacheTime = Date.now();
        return data;
    } catch (error) {
        console.error('Failed to fetch projects:', error);
        return projectsCache || [];
    }
}

export async function getFeaturedProjectsData() {
    if (featuredProjectsCache && isCacheValid(featuredProjectsCacheTime)) {
        return featuredProjectsCache;
    }

    try {
        const data = await getFeaturedProjects();
        featuredProjectsCache = data;
        featuredProjectsCacheTime = Date.now();
        return data;
    } catch (error) {
        console.error('Failed to fetch featured projects:', error);
        return featuredProjectsCache || [];
    }
}

export async function getExperiencesData() {
    if (experiencesCache && isCacheValid(experiencesCacheTime)) {
        return experiencesCache;
    }

    try {
        const data = await getExperiences();
        experiencesCache = data;
        experiencesCacheTime = Date.now();
        return data;
    } catch (error) {
        console.error('Failed to fetch experiences:', error);
        return experiencesCache || [];
    }
}

export async function getSkillsData() {
    if (skillsCache && isCacheValid(skillsCacheTime)) {
        return skillsCache;
    }

    try {
        const data = await getSkills();
        skillsCache = data;
        skillsCacheTime = Date.now();
        return data;
    } catch (error) {
        console.error('Failed to fetch skills:', error);
        return skillsCache || [];
    }
}
