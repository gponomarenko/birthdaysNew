import * as React from 'react';
import styles from './BirthDays.module.scss';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';
import { IStackProps, Stack } from 'office-ui-fabric-react/lib/Stack';

export const SpinnerBasicExample: React.FunctionComponent = () => {
  // This is just for laying out the label and spinner (spinners don't have to be inside a Stack)
  const rowProps: IStackProps = { horizontal: true, verticalAlign: 'center', horizontalAlign: 'center' };

  const tokens = {
    sectionStack: {
      childrenGap: 10,
    },
    spinnerStack: {
      childrenGap: 20,
    },
  };

  return (

      <Stack className={ styles.row } {...rowProps} tokens={tokens.spinnerStack}>
        <Spinner size={SpinnerSize.large} />
      </Stack>

  );
};
