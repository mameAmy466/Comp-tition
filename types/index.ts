// seo
export interface SeoMetaImage {
  id: number;
  file_name: string;
  full_url: string;
  thumb: string;
  caption: string | null;
  size: number;
  width: number;
  height: number;
}
export interface SeoMetaItem {
  id: number;
  locale: string;
  label: string;
  value: string;
  image?: SeoMetaImage;
}

// Langue Data
export interface ILangueData {
  result: ILangueDataItem[]
}
export interface ILangueDataItem {
  code: string;
  name: string;
}

// Presentation
export interface IPresentationSectionItem {
  id: number;
  slug: string;
  title: string;
  content: string;
}
export interface IPresentationSectionData {
  title: string;
  desc: string;
  items: IPresentationSectionItem[];
}

// guide section
export interface IGuideSectionItem {
  id: number;
  slug: string;
  title: string;
  content: string;
}
export interface IGuideSectionData {
  title: string;
  desc: string;
  items: IGuideSectionItem[];
}

// FAQ section
export interface IFaqSectionItem {
  id: number;
  title: string;
  response: string;
}
export interface IFaqSectionData {
  title: string;
  desc: string;
  questions: IFaqSectionItem[];
}

// Partenaire section
export interface IPartenaireSectionData {
  title: string;
  desc: string;
}

// Footer section
export interface IFooterSectionData {
  title: string;
  desc: string;
}

// activity section
export interface IActivitySectionItem {
  id: number;
  image: string;
  slug: string;
  title: string;
  publish_at: string;
  type: string;
}
export interface IActivitySectionData {
  result: IActivitySectionItem[];
}

// top section
export interface ITopSectionData {
  id: number;
  image: string;
  name: string;
  lieu: string;
  date: string;
  desc: string;
}

export interface IArticleDetail {
  id: number;
  image: string;
  slug: string;
  title: string;
  publish_at: string;
  type: string;
  content: string;
}

export interface IAlbumDetail {
  id: number;
  image: string;
  slug: string;
  title: string;
  publish_at: string;
  type: string;
  content: string;
  collection: string[];
}

export interface IVideoDetail {
  id: number;
  image: string;
  slug: string;
  title: string;
  publish_at: string;
  type: string;
  url: string;
  content: string;
  storage: string;
}

export interface ILiveEvent {
  title: string;
  description: string;
  storage: string;
  url: string;
}

// form
export interface IValidation {
  validation: {
    required: boolean;
    in?: string[];
  };
}
export interface ITextForm extends IValidation {
  title: string;
  name: string;
  type: string;
}
export interface ISelectForm extends ITextForm {
  items: string[];
  attr: { multiple?: boolean; single?: boolean; placeholder?: string };
}
export interface ICandidateForm {
  title: string;
  form: (ITextForm | ISelectForm)[];
}
export interface ICodeResult {
  personalDetails: {
    image: string;
    numero: string;
    firstname: string;
    lastname: string;
    sexe: string;
    type_piece: string;
    numero_piece: string;
    date_naiss: string;
    lieu_naiss: string;
  };
  contact: {
    pays: string;
    phone: string;
    email: string;
    address: string;
    langues: string;
  };
  participation: {
    riwayat: string;
    autre_concours: string;
  };
  candidature: {
    status: string;
    motif_refus: string;
  };
}
export interface ICodeResponse {
  status: boolean;
  result?: ICodeResult;
  msg: string;
}
