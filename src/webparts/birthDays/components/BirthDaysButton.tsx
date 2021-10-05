import * as React from 'react';
import { ActionButton } from 'office-ui-fabric-react/lib/components/Button';

export default function ButtonActionExample({ sendEmail }) {

  return (
    <ActionButton
        iconProps={{ iconName: 'Mail' }}
        href={sendEmail}
    >
      Greet your colleague!
    </ActionButton>
  );
}
