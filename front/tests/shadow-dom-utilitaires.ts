import {
  type AllByRole,
  type AllByText,
  buildQueries,
  type ByRoleMatcher,
  type ByRoleOptions,
  type Matcher,
  type MatcherOptions,
  queryAllByRole,
  queryAllByText,
} from '@testing-library/dom';

const _queryAllByRoleDeep: AllByRole = function (container, ...rest) {
  const result = queryAllByRole(container, ...rest); // replace here with different queryAll* variants.
  for (const element of container.querySelectorAll('*')) {
    if (element.shadowRoot) {
      result.push(
        ..._queryAllByRoleDeep(
          element.shadowRoot as ParentNode as HTMLElement,
          ...rest,
        ),
      );
    }
  }

  return result;
};

const _queryAllByTextDeep: AllByText = function (container, ...rest) {
  const result = queryAllByText(container, ...rest); // replace here with different queryAll* variants.
  for (const element of container.querySelectorAll('*')) {
    if (element.shadowRoot) {
      result.push(
        ..._queryAllByTextDeep(
          element.shadowRoot as ParentNode as HTMLElement,
          ...rest,
        ),
      );
    }
  }

  return result;
};

const [
  _queryByRoleDeep,
  _getAllByRoleDeep,
  _getByRoleDeep,
  _findAllByRoleDeep,
  _findByRoleDeep,
] = buildQueries<[ByRoleMatcher, ByRoleOptions?]>(
  _queryAllByRoleDeep,
  (_, role) => `Found multiple elements with the role ${role}`,
  (_, role) => `Unable to find an element with the role ${role}`,
);

const [
  _queryByTextDeep,
  _getAllByTextDeep,
  _getByTextDeep,
  _findAllByTextDeep,
  _findByTextDeep,
] = buildQueries<[Matcher, MatcherOptions?]>(
  _queryAllByTextDeep,
  (_, role) => `Found multiple elements with the role ${role}`,
  (_, role) => `Unable to find an element with the role ${role}`,
);

export const queryAllByRoleDeep = _queryAllByRoleDeep.bind(null, document.body);
export const queryByRoleDeep = _queryByRoleDeep.bind(null, document.body);
export const getAllByRoleDeep = _getAllByRoleDeep.bind(null, document.body);
export const getByRoleDeep = _getByRoleDeep.bind(null, document.body);
export const findAllByRoleDeep = _findAllByRoleDeep.bind(null, document.body);
export const findByRoleDeep = _findByRoleDeep.bind(null, document.body);

export const queryAllByTextDeep = _queryAllByTextDeep.bind(null, document.body);
export const queryByTextDeep = _queryByTextDeep.bind(null, document.body);
export const getAllByTextDeep = _getAllByTextDeep.bind(null, document.body);
export const getByTextDeep = _getByTextDeep.bind(null, document.body);
export const findAllByTextDeep = _findAllByTextDeep.bind(null, document.body);
export const findByTextDeep = _findByTextDeep.bind(null, document.body);
