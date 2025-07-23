import { Contact, ContactObject } from './Contact';

export interface ContactMethodsObject {
  hacker_rank: string | null;
  linked_in: string | null;
  x: string | null;
  instagram: string | null;
  github: string | null;
  youtube: string | null;
  website: string | null;
  email: string | null;
  phone: string | null;
}

export class ContactMethods {
  hackerRank: Contact;
  linkedin: Contact;
  x: Contact;
  instagram: Contact;
  github: Contact;
  youtube: Contact;
  website: Contact;
  email: Contact;
  phone: Contact;

  constructor(data?: Partial<ContactMethodsObject>) {
    this.hackerRank = new Contact({
      id: 'hacker_rank',
      title: 'Hacker Rank',
      type: 'url',
      url: data?.hacker_rank ?? '',
      class_name: 'fa-brands fa-hackerrank',
    });
    this.linkedin = new Contact({
      id: 'linkedin',
      title: 'LinkedIn',
      type: 'url',
      url: data?.linked_in ?? '',
      class_name: 'fa fa-linkedin fa-fw',
    });
    this.x = new Contact({
      id: 'x',
      title: 'X',
      type: 'url',
      url: data?.x ?? '',
      class_name: 'fa-brands fa-x-twitter',
    });
    this.instagram = new Contact({
      id: 'instagram',
      title: 'Instagram',
      type: 'url',
      url: data?.instagram ?? '',
      class_name: 'fa fa-instagram fa-fw',
    });
    this.github = new Contact({
      id: 'github',
      title: 'GitHub',
      type: 'url',
      url: data?.github ?? '',
      class_name: 'fa fa-github fa-fw',
    });
    this.youtube = new Contact({
      id: 'youtube',
      title: 'YouTube',
      type: 'url',
      url: data?.youtube ?? '',
      class_name: 'fa-brands fa-youtube',
    });
    this.website = new Contact({
      id: 'website',
      title: 'Website',
      type: 'url',
      url: data?.website ?? '',
      class_name: 'fa-solid fa-globe',
    });
    this.email = new Contact({
      id: 'email',
      title: 'Email',
      type: 'email',
      value: data?.email ?? '',
      class_name: 'fa fa-envelope fa-fw',
    });
    this.phone = new Contact({
      id: 'phone',
      title: 'Phone',
      type: 'tel',
      value: data?.phone ?? '',
      class_name: 'fa-solid fa-phone',
    });
  }

  setContact(data: Partial<ContactObject>) {
    const contactObject: Partial<ContactObject> = {
      id: data?.id ?? '',
      title: data?.title ?? '',
      url: data?.url ?? '',
      value: data?.value ?? '',
      type: data?.type ?? 'text',
      class_name: data?.class_name ?? '',
      img_src: data?.img_src ?? '',
    };

    return new Contact(contactObject);
  }

  setContactHackerRank(url: string) {
    this.hackerRank.setURL(url);
    this.hackerRank.setClassName('fa-brands fa-hackerrank');
  }

  setContactLinkedIn(url: string) {
    this.linkedin.setURL(url);
    this.linkedin.setClassName('fa fa-linkedin fa-fw');
  }

  setContactX(url: string) {
    this.x.setURL(url);
    this.x.setClassName('fa-brands fa-x-twitter');
  }

  setContactInstagram(url: string) {
    this.instagram.setURL(url);
    this.instagram.setClassName('fa fa-instagram fa-fw');
  }

  setContactGitHub(url: string) {
    this.github.setURL(url);
    this.github.setClassName('fa fa-github fa-fw');
  }

  setContactYoutube(url: string) {
    this.youtube.setURL(url);
    this.youtube.setClassName('fa-brands fa-youtube');
  }

  setContactWebsite(url: string) {
    this.website.setURL(url);
    this.website.setClassName('fa-solid fa-globe');
  }

  setContactEmail(value: string) {
    this.email.setValue(value);
    this.email.setClassName('fa fa-envelope fa-fw');
  }

  setContactPhone(value: string) {
    this.phone.setValue(value);
    this.phone.setClassName('fa-solid fa-phone');
  }

  fromGitHub(data: Array<Record<string, any>>) {
    if (Array.isArray(data) && data.length > 0) {
      data.forEach((contact) => {
        try {
          if (!contact?.url) return;

          const url = new URL(contact.url);

          if (url.host === 'www.hackerrank.com') {
            this.setContactHackerRank(url.href);
          }

          if (url.host === 'www.linkedin.com') {
            this.setContactLinkedIn(url.href);
          }

          if (url.host === 'x.com') {
            this.setContactX(url.href);
          }

          if (url.host === 'www.instagram.com') {
            this.setContactInstagram(url.href);
          }
        } catch (error) {
          console.error(`Invalid URL: ${contact.url}`, error);
        }
      });
    }
  }

  fromDB(data: Record<string, any>) {
    if (data?.id === 'email') {
      this.setContactEmail(data.value);
    }

    if (data?.id === 'phone') {
      this.setContactPhone(data.value);
    }
  }

  toContactMethodsObject(): ContactMethodsObject {
    return {
      hacker_rank:
        this.hackerRank && this.hackerRank.url ? this.hackerRank.url : null,
      linked_in: this.linkedin && this.linkedin.url ? this.linkedin.url : null,
      x: this.x && this.x.url ? this.x.url : null,
      instagram:
        this.instagram && this.instagram.url ? this.instagram.url : null,
      github: this.github && this.github.url ? this.github.url : null,
      youtube: this.youtube && this.youtube.url ? this.youtube.url : null,
      website: this.website && this.website.url ? this.website.url : null,
      email: this.email && this.email.value ? this.email.value : null,
      phone: this.phone && this.phone.value ? this.phone.value : null,
    };
  }
}
