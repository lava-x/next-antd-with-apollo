import React, { Component } from 'react';
import AddTodo from 'containers/AddTodo';
import VisibleTodoList from 'containers/VisibleTodoList';
import FilterLink from 'containers/FilterLink';
import { withTranslation } from 'i18next';

class Index extends Component {
  getInitialProps = () => ({
    namespacesRequired: ['todo', 'common'],
  });

  render() {
    const { t } = this.props;
    return (
      <div className="full-height-min has-text-centered pl20 pl20">
        <AddTodo className="mt20 mb20" />
        <p>
          {t('todo:show.label')}
:
          {' '}
          <FilterLink filter="SHOW_ALL">{t('todo:show.all')}</FilterLink>
          ,
          <FilterLink filter="SHOW_ACTIVE">{t('todo:show.active')}</FilterLink>
          ,
          <FilterLink filter="SHOW_COMPLETED">
            {t('todo:show.completed')}
          </FilterLink>
        </p>
        <VisibleTodoList />
      </div>
    );
  }
}

export default withTranslation('todo')(Index);
