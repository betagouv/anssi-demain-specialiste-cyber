import {
  AllByRole,
  buildQueries,
  ByRoleMatcher,
  ByRoleOptions,
  queryAllByRole,
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

export const queryAllByRoleDeep = _queryAllByRoleDeep.bind(null, document.body);
export const queryByRoleDeep = _queryByRoleDeep.bind(null, document.body);
export const getAllByRoleDeep = _getAllByRoleDeep.bind(null, document.body);
export const getByRoleDeep = _getByRoleDeep.bind(null, document.body);
export const findAllByRoleDeep = _findAllByRoleDeep.bind(null, document.body);
export const findByRoleDeep = _findByRoleDeep.bind(null, document.body);
