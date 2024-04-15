## Example to show strange test behavior when using `useQuery` with `@nonreactive` directive.
See `test.js`.

## How to run
1. Clone this repo.
2. `yarn install`
3. `yarn test`

## Expected result:
`useQuery` does not react to `@nonreactive` field(`status`) change, as in real browser.
So `Trail` component should not re-render and test should pass.

## Actual result:
`useQuery` reacts to `status` update and test fails:
```
 FAIL  ./test.js
  × Should not react to @nonreactive field changes (160 ms)

  ● Should not react to @nonreactive field changes

    expect(jest.fn()).not.toHaveBeenCalled()

    Expected number of calls: 0
    Received number of calls: 1

    1: called with 0 arguments

      56 |   });
      57 |
    > 58 |   expect(onRender).not.toHaveBeenCalled();
         |                        ^
      59 | });
      60 |

      at Object.toHaveBeenCalled (test.js:58:24)

```
