const manifest = `
name: helloManifest
fields:
  - name: goofy
  - name: pluto
    conditions:
        and:
          - target: goofy
            value: true
        state:
          classes: 
            - text-red-500
  - name: elmo
    conditions:
        and:
          - target: pluto
            value: true
          - target: barney
            value: true
        state:
          classes: 
            - text-blue-500
  - name: barney
    conditions:
        or:
          - target: goofy
            value: false
          - target: pluto
            value: false
        state:
          show: false 
`;

export default manifest;
