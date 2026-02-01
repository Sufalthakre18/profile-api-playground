import Profile from "../models/Profile.js";

export function healthCheck(req, res) {
  res.status(200).json({
    status: "OK",
    message: "Server is running"
  });
}

export async function getProfile(req, res) {
  try {
    const profile = await Profile.findOne();
    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getProjects(req, res) {
  try {
    const { skill } = req.query;
    const profile = await Profile.findOne();

    if (!profile) {
      return res.status(404).json({ error: "Profile not found" });
    }

    let projects = profile.projects || [];

    if (skill) {
      projects = projects.filter(project =>
        project.description?.toLowerCase().includes(skill.toLowerCase())
      );
    }

    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


export async function getTopSkills(req, res) {
  try {
    const profile = await Profile.findOne();
    const topSkills = profile?.skills?.slice(0, 5) || [];
    res.json(topSkills);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


export async function searchProfile(req, res) {
  try {
    const { q } = req.query;
    const profile = await Profile.findOne();

    if (!profile) {
      return res.status(404).json({ error: "Profile not found" });
    }

    if (!q) {
      return res.json(profile);
    }

    const query = q.toLowerCase();

    const results = {
      skills: profile.skills.filter(skill =>
        skill.toLowerCase().includes(query)
      ),
      projects: profile.projects.filter(project =>
        project.title?.toLowerCase().includes(query) ||
        project.description?.toLowerCase().includes(query)
      )
    };

    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


export async function createProfile(req, res) {
  try {
    const profile = await Profile.create(req.body);
    res.status(201).json(profile);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}


export async function updateProfile(req, res) {
  try {
    const profile = await Profile.findOneAndUpdate({}, req.body, {
      new: true
    });

    if (!profile) {
      return res.status(404).json({ error: "Profile not found" });
    }

    res.json(profile);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}


export async function deleteProfile(req, res) {
  try {
    await Profile.deleteMany({});
    res.json({ message: "Profile deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
