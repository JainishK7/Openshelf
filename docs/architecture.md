# Architecture

OpenShelf is a client-side web application.

```text
+-----------------------------+
|          Browser            |
|     index.html + CSS        |
+--------------+--------------+
               |
               v
+-----------------------------+
|        js/app.js            |
|  state · events · rendering |
+--------------+--------------+
               |
               v
+-----------------------------+
|       localStorage          |
|   demo catalogue persistence|
+-----------------------------+

        GitHub Actions
              |
              v
        npm test + validate
```

## Design Rationale

- Plain web technologies keep the project easy to inspect.
- Browser storage avoids a backend dependency for the demonstration.
- Documentation and workflow rules live beside the source code.
- Repository checks run automatically on pushes and pull requests.
