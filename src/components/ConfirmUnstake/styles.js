import styled from 'styled-components'

export const Box = styled.div`
  width: 100%;
  display: grid;
  padding: 0px 15px;
  position: relative;
  grid-template-rows: auto 2fr auto;
  > div {
    width: inherit;
  }

  .header-row {
    border-bottom: 1px solid ${({ theme }) => theme.bg4};
  }
  > div:last-child {
    border-top: 1px solid ${({ theme }) => theme.bg4};
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 0;
  }

  .row-container div {
    margin-top: 25px;
  }

  p,
  .row1,
  .row3 {
    width: 100%;

    .a {
      grid-area: a;
    }
    .b {
      grid-area: b;
    }
    .c {
      grid-area: c;
    }
    .d {
      grid-area: d;
      text-align: right;
    }

    display: grid;
    grid-template-areas:
      'a c'
      'b d';
    gap: 10px;
    justify-content: space-between;
    .b,
    .d {
      font-weight: bold;
    }
  }

  .row2 {
    gap: 10px;
  }
  .row2,
  .row4 {
    width: 100%;
    margin-left: auto;
    margin-right: auto;

    display: flex;
    flex-direction: column;
  }
`
