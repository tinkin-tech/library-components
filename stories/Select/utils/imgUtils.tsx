import * as React from 'react';

interface IImageSvgInterface {
  icon: string;
  style?: object;
  className?: string;
}

export class SvgImport extends React.PureComponent<IImageSvgInterface> {
  private readonly icon: React.RefObject<HTMLDivElement>;

  constructor(props: IImageSvgInterface) {
    super(props);
    this.icon = React.createRef();
    this.getIcon = this.getIcon.bind(this);
    this.loadImage = this.loadImage.bind(this);
  }

  public componentDidMount() {
    this.getIcon();
  }

  public render() {
    return (
      <span
        ref={this.icon}
        style={this.props.style || {}}
        className={`svg-icon ${this.props.className || ''}`}
      />
    );
  }

  private loadImage(): any {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', this.props.icon);
      xhr.overrideMimeType('image/svg+xml');
      xhr.send('');
      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(xhr.responseXML.documentElement);
        } else {
          reject({
            status: xhr.status,
            statusText: xhr.statusText
          });
        }
      };
      xhr.onerror = () => {
        reject({
          status: xhr.status,
          statusText: xhr.statusText
        });
      };
    });
  }

  private async getIcon() {
    const icon = await this.loadImage();
    if (this.icon.current) {
      this.icon.current.append(icon);
    }
  }
}

export const getFileName = (fileName: string): string => {
  if (!fileName) {
    return '';
  }
  const stringIndex = fileName.lastIndexOf('/');
  return fileName.substring(stringIndex + 1);
};

export const getFileExtension = (fileName: string): string => {
  const fileNameSubstring = getFileName(fileName);
  const fileExtensionIndex = fileNameSubstring
    ? fileNameSubstring.lastIndexOf('.')
    : 0;
  return fileNameSubstring
    ? fileNameSubstring.substring(fileExtensionIndex + 1)
    : '';
};
