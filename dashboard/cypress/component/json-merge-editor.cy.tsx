import { IJsonMergeEditorProps, IResolveResult, JsonMergeEditor } from '~/definition-editor/json-merge-editor';
import { IDiffTarget } from '~/definition-editor/json-merge-editor/types';
import { Accessor, Matcher } from '@zeeko/power-accessor';
import { cloneDeep, get, noop } from 'lodash';

Cypress.SelectorPlayground.defaults({
  onElement: (el) => {
    if (el.attr('aria-label')) {
      return `[aria-label="${el.attr('aria-label')}"]`;
    }
  },
});

type UserType = {
  n: string;
  id: string;
  name: string;
  address: string;
  birthDate: string;
  email: string;
};
const documents = {
  base: {
    users: [
      {
        n: '1',
        id: '23555ec0-8aac-4d81-bb02-a2ba8d10e937',
        name: 'Teandre Pecoraro',
        address: 'Impacts St 3510, Rathenow, Mauritania, 744248',
        birthDate: '12.01.1992',
        email: 'tessia_mireles2b86@sponsored.rp',
      },
      {
        n: '2',
        id: '8766fcc0-050d-4d4a-b695-95b2180dc2e9',
        name: 'Carisa Hartigan',
        address: 'Hi St 2878, Lyndell, Guatemala, 572743',
        birthDate: '16.06.2022',
        email: 'cyler_kurtzse@resolve.cn',
      },
      {
        n: '3',
        id: '90ca82a1-546f-40e3-80fb-352bab0fa2bc',
        name: 'Halbert Bunnell',
        address: 'Emotional St 4605, Aguadulce, Switzerland, 453520',
        birthDate: '25.01.2019',
        email: 'hawley_dursthl@curves.smz',
      },
    ],
  },
  local: {
    users: [
      {
        n: '1',
        id: '23555ec0-8aac-4d81-bb02-a2ba8d10e937',
        name: 'Modified',
        address: 'Impacts St 3510, Rathenow, Mauritania, 744248',
        birthDate: '12.01.1992',
        email: 'tessia_mireles2b86@sponsored.rp',
      },
      {
        n: '3',
        id: 'aaca82a1-546f-40e3-80fb-352bab0fa2bc',
        name: 'Aalbert',
        address: 'Emotional St 4605, Aguadulce, Switzerland, 453520',
        birthDate: '25.01.2019',
        email: 'hawley_dursthl@curves.smz',
      },
    ],
  },
  remote: {
    users: [
      {
        n: '2',
        id: '8766fcc0-050d-4d4a-b695-95b2180dc2e9',
        name: 'Carisa Hartigan',
        address: 'Hi St 2878, Lyndell, Guatemala, 572743',
        birthDate: '16.06.2022',
        email: 'cyler_kurtzse@resolve.cn',
      },
      {
        n: '3',
        id: '90ca82a1-546f-40e3-80fb-352bab0fa2bc',
        name: 'Halbert Bunnell',
        address: 'Emotional St 4605, Aguadulce, Switzerland, 453520',
        birthDate: '25.01.2019',
        email: 'hawley_dursthl@curves.smz',
      },
    ],
  },
};

const nodes: IDiffTarget<UserType, string>[] = [
  {
    selector: new Accessor<object, UserType>('users', Matcher.all),
    idSelector: (it: UserType) => it.id,
    formatDisplayName: (it) => `User: ${it.name}`,
    produceOperation: (op, pointers, value) => {
      if (op === 'added') {
        return (doc) => {
          // when adding, the base pointer is not available
          const users = get(doc, 'users') as UserType[];
          users.push(value);
        };
      }
      if (op === 'removed') {
        return (doc) => {
          console.log('removed', doc, pointers);
          pointers.base?.remove(doc);
        };
      }
      if (op === 'modified') {
        return (doc) => {
          pointers.base?.set(doc, value);
        };
      }
      return noop;
    },
  },
];
describe('json-merge-editor.cy.ts', () => {
  function mount(onApply: IJsonMergeEditorProps['onApply']) {
    cy.viewport(900, 600);
    cy.mount(<JsonMergeEditor documents={documents} diffNodes={nodes} onApply={onApply} />);
  }

  it('playground', () => {
    const onApplyStub = cy.stub().as('onApply');
    mount(onApplyStub);
    // there should be 4 changes, aria-label=changed: xxxx
    const changes = '[aria-label^="changed:"]';
    cy.get(changes).should('have.length', 4);
    // accept remote changes for first
    cy.get(changes)
      .first()
      .findByLabelText(/accept remote/i)
      .click();
    // accept local changes for second
    cy.get(changes)
      .eq(1)
      .findByLabelText(/accept local/i)
      .click();
    cy.findByText(/pending changes: 2/i).should('exist');
    cy.findByText(/undo/i).click();
    cy.findByText(/pending changes: 1/i).should('exist');
    // accept local changes for second
    cy.get(changes)
      .eq(1)
      .findByLabelText(/accept local/i)
      .click();
    // accept remote changes for third
    cy.get(changes)
      .eq(2)
      .findByLabelText(/accept remote/i)
      .click();
    // accept local changes for fourth
    cy.get(changes)
      .eq(3)
      .findByLabelText(/accept local/i)
      .click();
    // click apply
    cy.findByText(/apply/i)
      .click()
      .then(() => {
        expect(onApplyStub).to.be.calledOnce;
        // get the first argument
        expect(onApplyStub.args[0][0].map((it: { from: string }) => it.from)).to.deep.eq([
          'remote',
          'local',
          'remote',
          'local',
        ]);
        const baseClone = cloneDeep(documents.base);
        onApplyStub.args[0][0].forEach((it: IResolveResult) => it.operation(baseClone));
        expect(baseClone).to.deep.eq({
          users: [
            {
              n: '3',
              id: '90ca82a1-546f-40e3-80fb-352bab0fa2bc',
              name: 'Halbert Bunnell',
              address: 'Emotional St 4605, Aguadulce, Switzerland, 453520',
              birthDate: '25.01.2019',
              email: 'hawley_dursthl@curves.smz',
            },
            {
              n: '3',
              id: 'aaca82a1-546f-40e3-80fb-352bab0fa2bc',
              name: 'Aalbert',
              address: 'Emotional St 4605, Aguadulce, Switzerland, 453520',
              birthDate: '25.01.2019',
              email: 'hawley_dursthl@curves.smz',
            },
          ],
        });
      });
  });
});
