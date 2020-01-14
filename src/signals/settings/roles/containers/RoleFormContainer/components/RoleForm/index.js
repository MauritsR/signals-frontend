import React, { useEffect, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { Label as FieldLabel, Checkbox, themeSpacing } from '@datapunt/asc-ui';
import useFormValidation from 'hooks/useFormValidation';

import Input from 'components/Input';
import FormFooter from 'components/FormFooter';

import { ROLES_URL } from 'signals/settings/routes';

const Label = styled(FieldLabel)`
  display: block;
  font-family: Avenir Next LT W01 Demi, arial, sans-serif;
  margin-bottom: ${themeSpacing(3)};
`;

const StyledInput = styled(Input)`
  margin-bottom: ${themeSpacing(8)};
`;

export const RoleForm = ({
  role,
  permissions,
  onPatchRole,
  onSaveRole,
  readOnly,
}) => {
  const formRef = useRef(null);
  const { isValid, validate, errors, event } = useFormValidation(formRef);

  useEffect(() => {
    if (isValid && !readOnly) {
      handleSubmit(event);
    }
  }, [event, isValid, handleSubmit, errors, readOnly]);

  const history = useHistory();

  const handleSubmit = useCallback(
    e => {
      const {
        target: {
          form: { elements },
        },
      } = e;
      const permission_ids = [];
      permissions.forEach(permission => {
        if (elements[`permission${permission.id}`].checked) {
          permission_ids.push(permission.id);
        }
      });

      const updatedRole = {
        name: elements.name.value,
        permission_ids,
      };

      if (role.id) {
        onPatchRole({
          id: role.id,
          ...updatedRole,
        });
      } else {
        onSaveRole(updatedRole);
      }
    },
    [onPatchRole, onSaveRole, permissions, role.id]
  );

  const handleCancel = useCallback(() => {
    history.push(ROLES_URL);
  }, [history]);

  return (
    <div data-testid="rolesForm">
      <form ref={formRef} noValidate>
        <StyledInput
          data-testid="rolesFormFieldName"
          defaultValue={role.name}
          disabled={readOnly}
          error={errors.name || null}
          id="name"
          label="Naam"
          name="name"
          required
          type="text"
        />

        <Label label="Rechten" />
        {permissions.map(permission => (
          <div key={permission.id}>
            <FieldLabel
              disabled={readOnly}
              htmlFor={`permission${permission.id}`}
              label={permission.name}
            >
              <Checkbox
                id={`permission${permission.id}`}
                checked={role.permissions.find(
                  item => item.id === permission.id
                )}
              />
            </FieldLabel>
          </div>
        ))}

        {!readOnly && (
          <FormFooter
            cancelBtnLabel="Annuleer"
            onCancel={handleCancel}
            onSubmitForm={validate}
            submitBtnLabel="Opslaan"
          />
        )}
      </form>
    </div>
  );
};

RoleForm.defaultProps = {
  readOnly: false,
  role: {
    name: '',
    permissions: [],
  },
};

RoleForm.propTypes = {
  role: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    permissions: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
      })
    ),
  }),
  permissions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,

  onPatchRole: PropTypes.func.isRequired,
  onSaveRole: PropTypes.func.isRequired,
  /** When true, will not allow to submit the form and render all fields disabled */
  readOnly: PropTypes.bool,
};

export default RoleForm;