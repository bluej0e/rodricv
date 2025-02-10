export interface Translation {
  title: string;
  subtitle: string;
  about: {
    title: string;
    content: string[];
  };
  experience: {
    title: string;
    [key: string]: {
      company: string;
      role: string;
      period: string;
      description: string;
      achievements: string[];
    } | string;
  };
  skills: {
    title: string;
    professional: string;
    software: string;
    items: {
      [key: string]: string;
    };
  };
  contact: {
    button: string;
    email: string;
    call: string;
    whatsapp: string;
    telegram: string;
    location: string;
    website: string;
    email_address: string;
    phone: string;
  };
  automation: {
    title: string;
    subtitle: string;
    categories: {
      [key: string]: {
        title: string;
        tags: string[];
      };
    };
  };
  education: {
    title: string;
    items: Array<{
      degree: string;
      school: string;
      description: string;
    }>;
  };
  interests: {
    title: string;
    items: Array<{
      title: string;
      detail: string;
    }>;
  };
}

export interface Translations {
  [lang: string]: {
    title: string;
    subtitle: string;
    about: {
      title: string;
      content: string[];
    };
    experience: {
      title: string;
      [key: string]: any;
    };
    skills: {
      title: string;
      subtitle: string;
      categories: {
        [key: string]: {
          title: string;
          tags: string[];
        };
      };
    };
    contact: {
      button: string;
      email: string;
      call: string;
      whatsapp: string;
      telegram: string;
      location: string;
      website: string;
      email_address: string;
      phone: string;
    };
    education: {
      title: string;
      items: Array<{
        degree: string;
        school: string;
        description: string;
      }>;
    };
    interests: {
      title: string;
      items: Array<{
        title: string;
        detail: string;
      }>;
    };
  };
} 