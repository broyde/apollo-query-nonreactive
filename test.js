/** @jest-environment jsdom */

const React = require('react');
const {gql, InMemoryCache, useFragment, useQuery} = require('@apollo/client');
const {MockedProvider} = require('@apollo/client/testing');
const {render, act} = require('@testing-library/react');

const TRAIL_QUERY = gql`
  query TrailQuery {
    trail {
      id
      status @nonreactive
    }
  }
`;

const onRender = jest.fn();

const Trail = () => {
  const { data } = useQuery(TRAIL_QUERY);

  onRender();

  return <b>{data.trail.id}</b>;
}

it('Should not react to @nonreactive field changes', async () => {
  const cache = new InMemoryCache();
  cache.writeQuery({
    query: TRAIL_QUERY,
    data: {
      trail: {id: 1, status: 'OPEN', __typename: 'Trail'},
      __typename: 'Query',
    },
  });

  render(
    <MockedProvider cache={cache}>
      <Trail />
    </MockedProvider>
  );
  expect(onRender).toHaveBeenCalledTimes(1);

  onRender.mockClear();

  await act(() => {
    cache.writeQuery({
      query: TRAIL_QUERY,
      data: {
        trail: {id: 1, status: 'CLOSED', __typename: 'Trail'},
        __typename: 'Query',
      },
    });
    // Wait some time for unwanted re-render after cache update.
    return new Promise((resolve) => setTimeout(resolve, 100));
  });

  expect(onRender).not.toHaveBeenCalled();
});
