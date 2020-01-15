export const todoApi = (function() {
  if (!localStorage.getItem("todos")) {
    localStorage.setItem("todos", "{}");
  }
  let todos = JSON.parse(localStorage.getItem("todos"));
  return {
    all() {
      return Promise.resolve(Object.values(todos));
    },
    findBy(key, value) {
      return Promise.resolve(
        Object.values(todos).find(todo => {
          return todo[key] === value;
        })
      );
    },
    filterBy(key, value) {
      return Promise.resolve(
        Object.values(todos).filter(todo => {
          return todo[key] === value;
        })
      );
    },
    create(user_todo) {
      return new Promise((resolve, reject) => {
        try {
          const id = Math.floor(new Date().valueOf() * Math.random());
          todos[id] = user_todo;
          localStorage.setItem("todos", JSON.stringify(todos));
          return resolve(id);
        } catch (e) {
          return reject(e);
        }
      });
    },
    update(id, todo) {
      return new Promise((resolve, reject) => {
        try {
          const updated = { ...todos[id], ...todo };
          todos[id] = updated;
          localStorage.setItem("todos", JSON.stringify(todos));
          return resolve(updated);
        } catch (e) {
          return reject(e);
        }
      });
    },
    remove(id) {
      return new Promise((resolve, reject) => {
        try {
          todos = Object.keys(todos).reduce((without, todoId) => {
            if (id === todoId) {
              return without;
            }
            return {
              ...without,
              [todoId]: todos[todoId]
            };
          }, {});
          localStorage.setItem("todos", JSON.stringify(todos));
          return resolve();
        } catch (e) {
          return reject(e);
        }
      });
    }
  };
})();
