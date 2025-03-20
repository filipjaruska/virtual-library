import type { Schema, Attribute } from '@strapi/strapi';

export interface LayoutQnaSection extends Schema.Component {
  collectionName: 'components_layout_qna_sections';
  info: {
    displayName: 'Qna Section';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    qnas: Attribute.Component<'components.qnas', true>;
  };
}

export interface LayoutHeroSection extends Schema.Component {
  collectionName: 'components_layout_hero_sections';
  info: {
    displayName: 'Hero Section';
  };
  attributes: {
    heading: Attribute.String;
    subHeading: Attribute.Text;
    image: Attribute.Media<'images'>;
    link: Attribute.Component<'components.link'>;
  };
}

export interface LayoutHeader extends Schema.Component {
  collectionName: 'components_layout_headers';
  info: {
    displayName: 'Header';
  };
  attributes: {
    logoText: Attribute.Component<'components.link'>;
    ctaButton: Attribute.Component<'components.link'>;
  };
}

export interface LayoutFooter extends Schema.Component {
  collectionName: 'components_layout_footers';
  info: {
    displayName: 'Footer';
  };
  attributes: {
    logoText: Attribute.Component<'components.link'>;
    text: Attribute.Text;
    socialLink: Attribute.Component<'components.link', true>;
  };
}

export interface LayoutFeaturesSection extends Schema.Component {
  collectionName: 'components_layout_features_sections';
  info: {
    displayName: 'Features Section';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.Text;
    feature: Attribute.Component<'components.feature', true>;
  };
}

export interface ComponentsTag extends Schema.Component {
  collectionName: 'components_components_tags';
  info: {
    displayName: 'Tag';
    description: '';
  };
  attributes: {
    name: Attribute.Enumeration<
      [
        'new',
        'popular',
        'upcoming',
        'gold',
        'sci-fi',
        'fiction',
        'romance novel',
        'thriller',
        "children's literature",
        'biography'
      ]
    >;
  };
}

export interface ComponentsQnas extends Schema.Component {
  collectionName: 'components_components_qnas';
  info: {
    displayName: 'Qnas';
  };
  attributes: {
    heading: Attribute.String;
    answer: Attribute.Text;
  };
}

export interface ComponentsLink extends Schema.Component {
  collectionName: 'components_components_links';
  info: {
    displayName: 'Link';
  };
  attributes: {
    url: Attribute.String;
    text: Attribute.String;
    isExternal: Attribute.Boolean;
  };
}

export interface ComponentsFeature extends Schema.Component {
  collectionName: 'components_components_features';
  info: {
    displayName: 'Feature';
    icon: 'brush';
    description: '';
  };
  attributes: {
    heading: Attribute.String;
    subHeading: Attribute.Text;
    icon: Attribute.Enumeration<['ICON_1', 'ICON_2', 'ICON_3']>;
  };
}

export interface ComponentsBook extends Schema.Component {
  collectionName: 'components_components_books';
  info: {
    displayName: 'Book';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.Text;
    author: Attribute.String;
    image: Attribute.Media<'images'>;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'layout.qna-section': LayoutQnaSection;
      'layout.hero-section': LayoutHeroSection;
      'layout.header': LayoutHeader;
      'layout.footer': LayoutFooter;
      'layout.features-section': LayoutFeaturesSection;
      'components.tag': ComponentsTag;
      'components.qnas': ComponentsQnas;
      'components.link': ComponentsLink;
      'components.feature': ComponentsFeature;
      'components.book': ComponentsBook;
    }
  }
}
