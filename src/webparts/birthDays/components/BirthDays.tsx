import * as React from 'react';
import styles from './BirthDays.module.scss';
import { IBirthDaysProps } from './IBirthDaysProps';

import { BirthDaysWebPartContext } from './utils/reactContext';
import { TextField, ITextFieldStyles } from 'office-ui-fabric-react/lib/TextField';
import { TestImages } from '@fluentui/example-data';
import BirthDaysCard from './BirthDaysCard';
import { SpinnerBasicExample } from './BirthDaysSpinner';

import { sp } from "@pnp/sp/presets/all";

export interface Iopt {
  month: "long";
  day: "numeric";
}

export const BirthDays: React.FunctionComponent<IBirthDaysProps> = (props) => {
  const [employees, setEmployees] = React.useState<any[]>([]);
  let isLoaded = employees.length ? true : false;

  const _getListOfContacts = React.useCallback(
    () => {
    sp.web.lists
      .getByTitle('Employees')
      .items
      .select(
        '*',
        'employeeCard/Id',
        'employeeCard/Title',
        'employeeCard/EMail',
        'employeeCard/Department',
        'employeeCard/JobTitle',
      )
      .expand('employeeCard').getAll()
      .then(
        (response: any) => {
          console.log('response', response);
          if (response) {
            console.log('response is setting to state');
            setEmployees(response);
          }
      })
      .catch((e) => console.log(`getListOfContacts error. Name: ${e.name}. Message: ${e.message}`)
      );
  }, [],
  );


  React.useEffect(() => {
    console.log("useEffect is running - loading employees");
    _getListOfContacts();
  }, []);

  const formatBirthdayDate = React.useCallback(
    (oldFormatDate: string): string => {
      const exactDay: Date  = new Date(oldFormatDate);
      const newFormatDate: string = exactDay.toLocaleDateString("uk-UK", { month: 'long', day: 'numeric' });

      return newFormatDate;
    }, []
  );

  const checkIfAnyBirthdayCloseToNow = React.useCallback(
  (birthday) => {
    const today = new Date();
    const todayMs = today.getTime();
    const start = todayMs - 86400000*2;
    const end = todayMs + 86400000*5;
    const dayToBeChecked = new Date(birthday + "-" + today.getFullYear()).getTime();

    // function myTime(actual) {
    //   const date = new Date(actual);
    //   return date.toString();
    // }

    // console.log("start: ", myTime(start), "today: ", myTime(today), "end: ", myTime(end), "check: ", dayToBeChecked, myTime(dayToBeChecked));

    return dayToBeChecked >= start && dayToBeChecked <= end;
  }, []);

  const checkIfActualMonth = (birthday) => {
    let date = new Date().toISOString().slice(5,7);
    let month = birthday.slice(0, 2);

    return +date === +month;
  };

  const filteredCloseBirthdays = React.useMemo(
    () => employees.filter(person => checkIfAnyBirthdayCloseToNow(person.birthdayEmployee)), [employees]);

  const filteredActualMonth = React.useMemo(
    () => employees.filter(person => checkIfActualMonth(person.birthdayEmployee)), [employees]);

    return (
      <div className={ styles.birthDays }>
        <div className={ styles.container }>
          {isLoaded
           ? <>
              {filteredCloseBirthdays.map(person => {
                return (
                  <div className={ styles.row }>
                    <BirthDaysCard
                      imageUrl={person.employeeCard ? '/_layouts/15/userphoto.aspx?size=L&accountname=' + person.employeeCard.EMail : ""}
                      fullName={person.fullName}
                      jobTitle={person.jobTitle}
                      birthday={formatBirthdayDate(person.birthdayEmployee)}
                      EMail={person.employeeCard ? person.employeeCard.EMail : ""}
                    />
                  </div>
                );
              })}
            </>
           : <SpinnerBasicExample />
          }

          <div className={ styles.row }>
            <BirthDaysCard
              imageUrl={TestImages.personaFemale}
              fullName="Anna"
              jobTitle="Manager"
              birthday="April 1st"
              EMail="me@sp.com"
            />
          </div>
          <div className={ styles.row }>
            <BirthDaysCard
              imageUrl={TestImages.personaMale}
              fullName="Jacob"
              jobTitle="CEO"
              birthday="May 12th"
              EMail="me@sp.com"
            />
          </div>

        </div>
      </div>
    );
};
