import type { Schema, Attribute } from '@strapi/strapi';

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

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'layout.hero-section': LayoutHeroSection;
      'layout.header': LayoutHeader;
      'layout.footer': LayoutFooter;
      'components.link': ComponentsLink;
    }
  }
}
