import * as React from 'react';
import styles from './BirthDays.module.scss';
import { IBirthDaysProps } from './IBirthDaysProps';

import { BirthDaysWebPartContext } from './utils/reactContext';
import { IPersonaSharedProps, Persona, PersonaSize, PersonaPresence } from 'office-ui-fabric-react/lib/Persona';

import { TestImages } from '@fluentui/example-data';
import ButtonActionExample from './BirthDaysButton';

export default function BirthDaysCard({ imageUrl, fullName, jobTitle, birthday, EMail }) { 
  const [renderDetails, updateRenderDetails] = React.useState(true);

    return (
      <div>          
        <Persona 
          imageUrl={imageUrl}            
          text={fullName}
          secondaryText={jobTitle}
          tertiaryText={birthday}
          size={PersonaSize.size100}
          hidePersonaDetails={!renderDetails}
          imageAlt={fullName}
        />
        {<ButtonActionExample 
          sendEmail={`mailto:${EMail}`}
        />}
      </div>
    );
}
