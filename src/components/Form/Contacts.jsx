import { nanoid } from 'nanoid';

export const Contacts = ({ contacts, onRemove }) => {
  let nanoId = nanoid();
  return (
    <>
      <h2>Contacts</h2>
      <ul>
        <>
          {contacts.map(({ id, name, number }) => {
            return (
              <li key={id || nanoId}>
                <p>
                  <span>{name} : </span>
                  {number}
                </p>
                <button
                  // className={css.btn}
                  onClick={() => onRemove(id)}
                >
                  Delete
                </button>
              </li>
            );
          })}
        </>
      </ul>
    </>
  );
};
