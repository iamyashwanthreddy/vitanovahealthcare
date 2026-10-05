/* ============================================================
   Vitanova Health Care — Site content
   All copy is adapted from the source website's published content,
   with the brand name replaced by "Vitanova Health Care".
   No services, claims, statistics or contact details were invented.
   ============================================================ */

export const brand = {
  name: 'Vitanova Health Care',
  shortName: 'Vitanova',
  tagline: 'Seeing the person first, before their disability',
  coreValue:
    'Our core value is to provide a reliable and affordable high-quality service with compassion and care.',
};

export const contact = {
  addressLines: [
    'Office 1C North Valley Business Centre',
    'Old Mallow Road',
    'Cork',
    'T23 WN15',
  ],
  addressInline: 'Office 1C North Valley Business Centre, Old Mallow Road, Cork, T23 WN15',
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=Office+1C+North+Valley+Business+Centre%2C+Old+Mallow+Road%2C+Cork%2C+T23+WN15',
  phones: [
    { label: 'Mobile', number: '+353 89 480 8783', href: 'tel:+353894808783' },
  ],
  email: 'info@vitanovahealthcare.com',
  socials: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com' },
    { label: 'Instagram', href: 'https://www.instagram.com' },
    { label: 'Facebook', href: 'https://www.facebook.com' },
    { label: 'Twitter', href: 'https://www.twitter.com' },
  ],
};

export const nav = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  {
    label: 'Services',
    to: '/services',
    children: [
      { label: '24 Hour Health Care', to: '/services/24-hour-care' },
      { label: 'Home Services', to: '/services/home-services' },
      { label: 'General Care', to: '/services/general-care' },
      { label: 'Care Support', to: '/services/care-support' },
      { label: 'Homelessness', to: '/services/homelessness' },
    ],
  },
  { label: 'Careers', to: '/careers' },
  { label: 'Contact', to: '/contact' },
];

/* Pastel rotation used across feature cards, per DESIGN.md */
export const pastels = [
  'mint',
  'sage',
  'sky',
  'cream',
  'lilac',
  'peach',
];

export const services = [
  {
    slug: '24-hour-care',
    title: '24 Hour Health Care',
    pastel: 'mint',
    image: '/images/service-24-hour-care.jpg',
    imageAlt:
      'A carer and family member assisting an older man as he walks across his living room at home.',
    summary:
      'Round-the-clock care so clients can feel confident their health matters are addressed in a timely manner — without sacrificing their normal daily routines.',
    intro:
      "With our 24-Hour Care services, clients can feel confident that their health matters will be addressed in a timely manner — without sacrificing their normal daily routines. At Vitanova Health Care, we care for our clients' health and wellbeing.",
    sections: [
      {
        heading: 'Services provided',
        type: 'list',
        items: [
          'Mobility assistance',
          'Transferring and positioning',
          'Special diet & meal preparation',
          'Incontinence care and bathing',
          'Recreational activities',
        ],
      },
      {
        heading: 'The benefits of regular care',
        type: 'list',
        items: [
          'Ease the strain on family, especially the main family carer',
          'Provide peace of mind for family members who live far away',
          'Encourage and improve the independence of you or your loved one',
          'An established structure, with care calls arranged at agreed times each day',
          'Regular carers building a relationship, so clients look forward to their carers calling',
        ],
      },
    ],
  },
  {
    slug: 'home-services',
    title: 'Home Services',
    pastel: 'sky',
    image: '/images/service-home-services.jpg',
    imageAlt: 'Two older adults sharing coffee and conversation in a bright home living room.',
    summary:
      'Companionship and everyday home support that helps people stay comfortable, connected and independent in the place they know best.',
    intro:
      'Companionship and home services designed to help clients live comfortably and independently at home. We provide the best care with warmth, dignity and reliability.',
    kicker: 'Companionship and home services',
    sections: [
      {
        heading: 'How we help at home',
        type: 'list',
        items: [
          'Conversation and companionship',
          'Errand services and incidental transportation',
          'Medication reminders',
          'Meal preparation',
          'Light housekeeping, laundry and linen washing',
        ],
      },
    ],
  },
  {
    slug: 'general-care',
    title: 'General Care',
    pastel: 'sage',
    image: '/images/service-general-care.jpg',
    imageAlt: 'A carer helping an older man with his daily medication at the kitchen table.',
    summary:
      'A broad range of person-centred care, from daily support to specialist live-in and palliative care for you or your loved ones.',
    intro:
      'Interested in learning more about all the services we provide? We offer a broad range of general care and support. Contact us today and see how we can help you or your loved ones.',
    kicker: 'General care services we provide',
    sections: [
      {
        heading: 'Key areas of support',
        type: 'list',
        items: [
          'Challenging behaviour',
          'Complex needs',
          'Daily care',
          'Live-in care',
          'Palliative care',
          'Personal assistants',
          'Hospital discharge',
        ],
      },
    ],
  },
  {
    slug: 'care-support',
    title: 'Care Support',
    pastel: 'lilac',
    image: '/images/service-care-support.jpg',
    imageAlt: 'A support worker having a gentle, supportive conversation with a young girl.',
    summary:
      'Tailored care support for individuals, families, young people and children under the age of 18.',
    intro:
      'We offer various care support to individuals, families, young people and children under the age of 18, meeting each person where they are with dignity and respect.',
    sections: [
      {
        heading: 'Key areas of support',
        type: 'list',
        items: [
          'Challenging behaviour',
          'Complex needs',
          'Disability',
          'Hospital discharge',
          'Rehabilitation for all levels',
          'Substance and alcohol misuse',
          'Homelessness and drugs',
          'Supported housing',
        ],
      },
    ],
  },
  {
    slug: 'homelessness',
    title: 'Homelessness',
    pastel: 'peach',
    image: '/images/service-homelessness.jpg',
    imageAlt:
      'A support worker talking through paperwork with a couple at their kitchen table.',
    summary:
      'Low-threshold, specialist support for people experiencing homelessness — because we are committed to ending homelessness and changing lives.',
    intro:
      'We provide services for those experiencing homelessness. At Vitanova Health Care we are fully committed to ending homelessness and changing lives.',
    sections: [
      {
        heading: 'Our approach',
        type: 'text',
        body: [
          'We provide low-threshold, specialist support for people experiencing homelessness, meeting people without barriers and walking alongside them toward stability.',
          'We are fully committed to ending homelessness and changing lives, working with dignity, patience and respect at every step.',
        ],
      },
    ],
  },
];

export const servicesIntro =
  'Vitanova Health Care is a family-run health and social care provider with a reputation for high-quality nurses, senior healthcare assistants, healthcare assistants, support workers and one-to-one specialist carers. Explore the ways we can support you or your loved ones.';

export const about = {
  intro:
    'Vitanova Health Care is a trustworthy health and social care provider delivering quality services nationwide. We specialise in home-based care — from short check-in visits to full live-in support — and are committed to meeting our clients’ health and care needs.',
  missionStatement:
    'A leading healthcare enterprise in Ireland and abroad, through the provision of world-class healthcare solutions to all our clients.',
  mission:
    'To deliver elite, holistic, innovative healthcare solutions in Ireland and internationally, providing maximum care and support with professional integrity.',
  vision:
    'To be the unmatched leader in improving quality and reducing the cost of health and social care for the service users in the communities we serve.',
  passion:
    'We seek to instil hope and self-confidence through professional, research-based clinical practice and integrated care.',
  values: [
    {
      title: 'Compassion & care',
      body: 'We put warmth and dignity at the centre of every visit, seeing the person first — before their disability.',
    },
    {
      title: 'Professional integrity',
      body: 'Our care is grounded in research-based clinical practice and delivered with honesty and accountability.',
    },
    {
      title: 'Reliability',
      body: 'A reliable and affordable high-quality service families can depend on, with care calls at agreed times.',
    },
    {
      title: 'Person-centred',
      body: 'We build real relationships and tailor support to each individual, family, young person and child we serve.',
    },
  ],
};

export const homeHighlights = [
  {
    title: 'Number one for compassionate care',
    body: 'Vitanova Health Care is a family-run business with a reputation for providing high-quality nurses, senior healthcare assistants, healthcare assistants, support workers and one-to-one specialist carers.',
  },
  {
    title: 'Specialist staff, where you need them',
    body: 'Staff can be provided on a permanent or temporary basis to nursing homes, residential homes, supported living and hospitals.',
  },
  {
    title: 'Health plans we accept',
    body: 'We work with you to make care accessible, explaining medical insurance coverage and the benefits available to you.',
  },
];

/* Steps for the Careers page — reflects the source download/upload flow */
export const applicationSteps = [
  {
    title: 'Download the form',
    body: 'Download our application form and complete it at your own pace, wherever suits you best.',
  },
  {
    title: 'Complete your details',
    body: 'Tell us about the care you are looking for, or — if you are joining our team — your experience and availability.',
  },
  {
    title: 'Send it back to us',
    body: 'Email your completed form to our team and we will be in touch to talk through the next steps.',
  },
];

export const faqs = [
  {
    q: 'What areas do you cover?',
    a: 'We deliver health and social care services nationwide across Ireland.',
  },
  {
    q: 'What kind of care do you provide?',
    a: 'We specialise in home-based care ranging from short check-in visits to full live-in support, alongside 24-hour care, companionship, general care, care support and homelessness services.',
  },
  {
    q: 'Can you provide staff to care settings?',
    a: 'Yes. Staff can be provided on a permanent or temporary basis to nursing homes, residential homes, supported living and hospitals.',
  },
  {
    q: 'How do I apply for care or a role?',
    a: 'Visit our Careers page to download and complete our form, then email it back to us — or contact us directly and we will guide you through it.',
  },
];
