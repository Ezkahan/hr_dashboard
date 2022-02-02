import { useQuery } from "@apollo/client";
import React, { Dispatch, SetStateAction, useState } from "react";
import { useTranslation } from "react-i18next";
import { IAddPerson } from "../../../common/interfaces/People/IAddPerson";
import SearchableInput from "../../../components/SearchableInput/SearchableInput";
import { GET_PASSPORT_ISSUED_BY } from "../../../graphql/queries/People/getPassportIssuedByQuery";

const PassportIssuedBy: React.FC<any> = ({ state, setState, placeholder }) => {
  const { t } = useTranslation();

  const { loading, data, refetch } = useQuery(GET_PASSPORT_ISSUED_BY, {
    variables: { search: "" },
  });

  return (
    <SearchableInput
      title={t("passport_issued_by")}
      list={data && data.passportIssuedBy && data.passportIssuedBy.data}
      refetch={refetch}
      setState={setState}
      state={state}
      placeholder={placeholder}
    />
  );
};

export default PassportIssuedBy;
