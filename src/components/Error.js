export default ({ message }) => (
  <article className="message is-danger is-large">
    <div className="message-header">
      <p>Error</p>
    </div>
    <div className="message-body">{message}</div>
  </article>
);
