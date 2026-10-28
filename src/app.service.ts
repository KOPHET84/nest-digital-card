import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return /* HTML */ `
      <!doctype html>
      <html lang="ru">
        <head>
          <meta charset="UTF-8" />
          <title>GraphQL API</title>
          <style>
            body {
              font-family: system-ui, sans-serif;
              max-width: 800px;
              margin: 2rem auto;
              padding: 0 1rem;
              line-height: 1.5;
            }
            h1 {
              color: #e535ab;
            }
            pre {
              background: #f4f4f4;
              padding: 1rem;
              border-radius: 6px;
              overflow-x: auto;
              font-size: 13px;
            }
            a {
              color: #e535ab;
            }
            code {
              background: #f4f4f4;
              padding: 2px 6px;
              border-radius: 4px;
            }
          </style>
        </head>
        <body>
          <h1>GraphQL API</h1>
          <p>
            Apollo page: <a href="/graphql"><code>/graphql</code></a>
          </p>

          <h2>Пример запроса</h2>
          <pre><code>
query {
  profile {
    name
    description
    id
    links { 
      name 
      url 
    }
    skills {
      name
    }
    experience {
      company
      position
      achievements {
        description
      }
      projects {
        name
        miniDescription
      }
    }
  }
}
</code></pre>
        </body>
      </html>
    `;
  }
}
