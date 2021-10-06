import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneDropdown
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'BirthDaysWebPartStrings';
import { BirthDays } from './components/BirthDays';
import { IBirthDaysProps } from './components/IBirthDaysProps';

import { sp } from "@pnp/sp/presets/all";

export interface IBirthDaysWebPartProps {
  description: string;
  filterBirthdays: string;
}

export default class BirthDaysWebPart extends BaseClientSideWebPart<IBirthDaysWebPartProps> {

  public onInit(): Promise<void> {
    return super.onInit().then(_ => {
      sp.setup({
        spfxContext: this.context,
        sp: {
          headers: {
            Accept: "application/json; odata=nometadata"
          }
        }
      });
    });
  }

  public render(): void {
    const element: React.ReactElement<IBirthDaysProps> = React.createElement(
      BirthDays,
      {
        description: this.properties.description,
        filterValue: this.properties.filterBirthdays,
        context: this.context
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                }),
                PropertyPaneDropdown('filterBirthdays', {
                  label: 'Dropdown',
                  selectedKey: 'NearestBirthdays',
                  options: [
                    { key: 'NearestBirthdays', text: 'Nearest birthdays' },
                    { key: 'ActualMonthBirthdays', text: 'Birthdays in the actual month' }
                  ]
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
