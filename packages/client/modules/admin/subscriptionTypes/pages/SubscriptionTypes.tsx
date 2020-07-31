import React, { useState } from 'react';
import {
  Flex,
  Heading,
  IconButton,
  Stack,
  Collapse,
  useDisclosure,
  Button,
  List,
  ListItem,
  Text
} from '@chakra-ui/core';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton
} from '@chakra-ui/core';

import { LinkIconButton } from '../../../../components/Link';
import { useSubscriptionTypesQuery, SubscriptionTypesQuery } from '../../../../generated';
import Table from '../../../../components/Table';

interface IModalStuff {
  data: SubscriptionTypesQuery;
  onClose: () => void;
  id: number;
}

const ModalStuff: React.FC<IModalStuff> = ({ data, onClose, id }) => {
  const subscriptionType = data.subscriptionTypes.find((st) => st.id === id);

  return (
    <>
      <ModalOverlay />
      <ModalContent>
        {subscriptionType ? (
          <>
            <ModalHeader>{subscriptionType.name}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <b>Slug:</b> {subscriptionType.slug}
              <br />
              <b>Items: </b>
              {subscriptionType.subscriptionItems.length ? (
                <List styleType="disc">
                  {subscriptionType.subscriptionItems.map((si) => (
                    <ListItem key={si.id}>
                      {si.product.name} x {si.amount}
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Text>No items</Text>
              )}
            </ModalBody>

            <ModalFooter>
              <Stack isInline>
                <Button variantColor="green">Edit</Button>
                <Button variantColor="blue" mr={3} onClick={onClose}>
                  Close
                </Button>
              </Stack>
            </ModalFooter>
          </>
        ) : (
          <>
            <ModalHeader>Can'f find subscription type</ModalHeader>
            <ModalCloseButton />
            <ModalBody>Missing :(</ModalBody>

            <ModalFooter>
              <Button variantColor="blue" mr={3} onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </>
  );
};

export const SubscriptionTypesPage: React.FC = () => {
  const [openId, setOpenId] = useState(-1);
  const { loading, error, data } = useSubscriptionTypesQuery();

  const { isOpen, onOpen, onClose } = useDisclosure();

  console.log(open);

  return (
    <>
      <Flex justify="space-between">
        <Heading>Subscription types:</Heading>
      </Flex>
      {loading ? (
        <Heading>Loading...</Heading>
      ) : error ? (
        <Heading>Error...</Heading>
      ) : (
        <>
          <Table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Slug</th>
                <th>Name</th>
                <th>Price</th>
                <th>Ops</th>
              </tr>
            </thead>
            <tbody>
              {data.subscriptionTypes.map((st) => (
                <>
                  <tr key={st.id}>
                    <td>{st.id}</td>
                    <td>{st.slug}</td>
                    <td>{st.name}</td>
                    <td>{st.price}</td>
                    <td>
                      <Stack isInline>
                        <IconButton
                          icon="view"
                          aria-label="open"
                          onClick={() => {
                            setOpenId(st.id);
                            onOpen();
                          }}
                        />
                        {/* <IconButton
                      onClick={remove(st.id)}
                      icon="delete"
                      aria-label="Delete"
                      variantColor="red"
                    /> */}
                        {/* <LinkIconButton
                      href="/admin/users/[id]/edit"
                      as={`/admin/users/${st.id}/edit`}
                      icon="edit"
                      aria-label="Edit"
                      variantColor="green"
                    /> */}
                      </Stack>
                    </td>
                  </tr>
                </>
              ))}
            </tbody>
          </Table>

          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalStuff data={data} onClose={onClose} id={openId} />
          </Modal>
        </>
      )}
    </>
  );
};
