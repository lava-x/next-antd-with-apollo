import React from "react";
import { graphql } from "@apollo/react-hoc";
import { useTranslation } from "i18next";
import { mutations } from "graphql";

const defaultI18nNamespaceForThisComponent = "todo";
const { ADD_TODO } = mutations.Todos;
const AddTodo = ({ mutate, ...rest }) => {
  //
  // useTranslation() in component level.
  //
  const { t } = useTranslation(defaultI18nNamespaceForThisComponent);
  let input;

  return (
    <form
      {...rest}
      onSubmit={e => {
        e.preventDefault();
        if (!input.value.trim()) {
          return;
        }
        mutate({ variables: { text: input.value } });
        input.value = "";
      }}
    >
      <div className="field has-addons is-grouped is-grouped-centered">
        <div className="control">
          <input
            ref={node => {
              input = node;
            }}
            className="input is-medium"
            type="text"
            placeholder={t(
              `${defaultI18nNamespaceForThisComponent}:input.placeholder`
            )}
          />
        </div>
        <div className="control ">
          <button type="submit" className="button is-primary is-medium">
            {t(`${defaultI18nNamespaceForThisComponent}:show.add`)}
          </button>
        </div>
      </div>
    </form>
  );
};

export default graphql(ADD_TODO)(AddTodo);
