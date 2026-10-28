import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types.js';
import { AppModule } from './../src/app.module.js';

describe('GraphQL API (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should fetch profile data from GraphQL', () => {
    const graphqlQuery = {
      query: /* GraphQL */ `
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
      `,
    };

    return request(app.getHttpServer())
      .post('/graphql')
      .send(graphqlQuery)
      .expect(200)
      .expect((res) => {
        console.log(res.body);
        expect(res.body).toHaveProperty('data');
        expect(res.body.data).toHaveProperty('profile');
        expect(res.body.data.profile).toHaveProperty('links');
        expect(res.body.data.profile).toHaveProperty('skills');
        expect(res.body.data.profile).toHaveProperty('experience');
      });
  });

  afterEach(async () => {
    await app.close();
  });
});
